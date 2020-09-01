import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import useInterceptionObserver from "../hooks/useInterceptionObserver";
import { Doughnut } from "react-chartjs-2";

const Skills = ({ data }) => {
    const [ref, entry] = useInterceptionObserver({
        threshold: [0.1],
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
   
                    ctx.font = "30px " + fontStyle;

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
