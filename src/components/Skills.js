import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import useInterceptionObserver from "../hooks/useInterceptionObserver";
import { Doughnut } from "react-chartjs-2";
import skillsImg from "../assets/images/skills.svg";

const Skills = ({ data }) => {
    const [ref, entry] = useInterceptionObserver({
        threshold: [0.3],
    });

    const { isIntersecting } = entry;

    const chartPlugin = [
        {
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    //Get ctx from string
                    var ctx = chart.chart.ctx;

                    //Get options from the center object in options
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || "Arial";
                    var txt = centerConfig.text;
                    var color = centerConfig.color || "#000";
                    var sidePadding = centerConfig.sidePadding || 20;
                    // var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                    //Start with a base font of 30px
                    ctx.font = "30px " + fontStyle;

                    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                    // var stringWidth = ctx.measureText(txt).width;
                    // var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                    // Find out how much the font can grow in width.
                    // var widthRatio = elementWidth / stringWidth;
                    // var newFontSize = Math.floor(30 * widthRatio);
                    // var elementHeight = (chart.innerRadius * 2);

                    // Pick a new font size so it will not be larger than the height of label.
                    // var fontSizeToUse = Math.min(newFontSize, elementHeight);

                    //Set font settings to draw it correctly.
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var centerX =
                        (chart.chartArea.left + chart.chartArea.right) / 2;
                    var centerY =
                        (chart.chartArea.top + chart.chartArea.bottom) / 2;
                    ctx.font = 15 + "px " + fontStyle;
                    ctx.fillStyle = color;
                    ctx.sidePadding = sidePadding;

                    //Draw text in center
                    ctx.fillText(txt, centerX, centerY);
                }
            },
        },
    ];

    const skillsClasses = () => {
        let classes = ["animate-box"];

        if (isIntersecting) {
            classes = [...classes, "animated fadeInUp animated-fast"];
        }

        return classes.join(" ");
    };

    const setChartData = (values) => {
        const data = {
            datasets: [
                {
                    data: isIntersecting ? values : [],
                    backgroundColor: ["#394a6d"],
                    hoverBorderColor: ["#ffffff", "#ffffff"],
                },
            ],
        };

        return data;
    };

    const chartOpts = (name, level) => {
        return {
            cutoutPercentage: 93,
            maintainAspectRatio: false,
            animation: {
                animationScale: true,
                duration: 2000,
            },
            tooltips: {
                enabled: false,
            },
            elements: {
                center: {
                    text: `${name} ${level * 100}%`,
                    color: "#394a6d", //Default black
                    fontStyle: "Space mono", //Default Arial
                    sidePadding: 15, //Default 20 (as a percentage)
                },
            },
        };
    };

    return (
        <div id="fh5co-skills" ref={ref} className={skillsClasses()}>
            <Container>
                <Row>
                    <Col
                        md={{ span: 8, offset: 2 }}
                        className="text-center fh5co-heading"
                    >
                        <h2>Skills</h2>
                    </Col>
                </Row>
                <Row className="row-pb-md" style={{position:'relative'}}>
                    <div
                        className="skills-underlay"
                        style={{
                            position: "absolute",
                            height: "500px",
                            width: "100%",
                            backgroundImage: `url(${skillsImg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSide: "cover",
                            backgroundPosition: "center",
                            opacity: 0.2,
                        }}
                    >
                        &nbsp;
                    </div>
                    {data.map((skill) => {
                        const { level, name, id } = skill;
                        const values = [level, 1 - level];
                        return (
                            <Col
                                key={id}
                                md="3"
                                sm="6"
                                xs="12"
                                className="chart"
                            >
                                {/* <div className="chart" data-percent={skill.level * 100}><span><strong>{skill.name}</strong>{skill.level * 100}%</span></div> */}
                                <Doughnut
                                    plugins={chartPlugin}
                                    width={4}
                                    height={160}
                                    options={chartOpts(name, level)}
                                    data={setChartData(values)}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Skills;
