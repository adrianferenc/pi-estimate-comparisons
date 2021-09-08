import { useState } from "react";
import Plot from 'react-plotly.js';
import { Card, Modal } from 'react-bootstrap';
import MathJax from 'react-mathjax';

export default function QuarterCircleLE({ n, graphData }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card>
                <Card.Title>
                    <span style={{ display: "flex", justifyContent: "center", margin: "0 30px" }}>
                        The Area of a Quarter Circle Using Riemann Sums and Left Endpoints
                    </span>
                    <span onClick={handleShow} style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                    </span>
                </Card.Title>
                <Plot
                    data={[{
                        x: graphData.leftEndpoints,
                        y: graphData.quarterCircle,
                        type: 'scatter',
                        name: '$y = \\sqrt{1-x^2}$',
                        marker: {
                            color: 'rgb(0, 77, 64)'
                        }

                    },
                    {
                        x: graphData.leftEndpoints,
                        y: graphData.leftBarHeight,
                        type: 'bar',
                        width: 1 / (n - 1),
                        offset: 0,
                        text: graphData.leftBarArea,
                        showlegend: false,
                        marker: {
                            color: 'rgb(255, 193, 7)'
                        }
                    }

                    ]}
                    layout={{
                        title: '',
                        width: 600,
                        height: 500,
                        xaxis: { range: [0, 1] },
                        yaxis: { range: [0, 1] }
                    }}

                    config={{
                        scrollZoom: true,
                        displayModeBar: false,
                        showTips: false,
                        responsive: true
                    }}
                />
                <MathJax.Provider>
                    <MathJax.Node formula={
                        `\\text{The Total Area Is } ${graphData.leftTotalArea}`
                    } />
                    <MathJax.Node formula={
                        `\\left|\\pi - 4\\left(\\text{Total Area}\\right)\\right| = ${Math.abs(Math.PI - 4 * graphData.leftTotalArea)}`
                    } />
                </MathJax.Provider>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Riemann Sums and Left Endpoints</Modal.Title>
                </Modal.Header>
                <Modal.Body>Info about <a href="https://en.wikipedia.org/wiki/Riemann_sum">Riemann Sums</a> TK</Modal.Body>
            </Modal>

        </>
    )
}