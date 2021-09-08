import { useState } from "react";
import Plot from 'react-plotly.js';
import { Card, Modal } from 'react-bootstrap';
import MathJax from 'react-mathjax';

export default function MonteCarlo({ n, monteCarloData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Card>
        <Card.Title>
          <span style={{ display: "flex", justifyContent: "center", margin: "0 30px" }}>
            The Monte Carlo Method
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
            x: monteCarloData.insidePointsX,
            y: monteCarloData.insidePointsY,
            type: 'scatter',
            mode: 'markers',
            name: `Points Inside the Circle (${monteCarloData.insidePointsX.length})`,
            marker: {
              color: 'rgb(216,27,96)',
            }
          },
          {
            x: monteCarloData.outsidePointsX,
            y: monteCarloData.outsidePointsY,
            type: 'scatter',
            mode: 'markers',
            name: `Points Outside the Circle (${monteCarloData.outsidePointsX.length})`,
            marker: {
              color: 'rgb(30,136,229)'
            }
          }
          ]}
          layout={
            {
              xaxis: {
                range: [-1, 1],
                zeroline: false
              },
              yaxis: {
                range: [-1, 1]
              },
              width: 650,
              height: 500,
              showlegend: true,
              legend: [],
              shapes: [
                {
                  type: 'circle',
                  xref: 'x',
                  yref: 'y',
                  x0: -1,
                  y0: -1,
                  x1: 1,
                  y1: 1,
                },
                {
                  type: 'rectangle',
                  xref: 'x',
                  yref: 'y',
                  x0: -1,
                  y0: -1,
                  x1: 1,
                  y1: 1,
                },
              ]
            }}
          config={{
            displayModeBar: false,
            showTips: false,
            responsive: true
          }}
        />

        <MathJax.Provider>
          <MathJax.Node formula={
            `\\frac{\\text{Area of the circle}}{\\text{Area of the square}} = \\frac{\\pi\\times (1)^2}{2\\times2} = \\frac{\\pi}{4}`
          } />
          <MathJax.Node formula={
            `\\frac{\\text{Points in the circle}}{\\text{Points in the square}} = \\frac{${monteCarloData.insidePointsX.length}}{${(monteCarloData.insidePointsX.length + monteCarloData.outsidePointsX.length)}} = ${monteCarloData.insidePointsX.length / (monteCarloData.insidePointsX.length + monteCarloData.outsidePointsX.length)}`
          } />

          <MathJax.Node formula={
            `\\left|\\pi - 4\\times\\frac{${monteCarloData.insidePointsX.length}}{${(monteCarloData.insidePointsX.length + monteCarloData.outsidePointsX.length)}}\\right| = ${Math.abs(4 * monteCarloData.insidePointsX.length / (monteCarloData.insidePointsX.length + monteCarloData.outsidePointsX.length) - Math.PI)}`
          } />
        </MathJax.Provider>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Monte Carlo Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <MathJax.Provider>
            <MathJax.Node formula={
              `\\text{The } \\href{https://en.wikipedia.org/wiki/Monte_Carlo_method}{\\text{Monte Carlo Method}} \\text{ for estimating } \\pi. \\text{The method}`
            } />
            <MathJax.Node formula={
              `\\text{places random points in the interval } [-1,1] \\times [-1,1].`
            } />

            <MathJax.Node formula={
              `\\text{The area of the square is 4 and the area of the inscribed}`
            } />

            <MathJax.Node formula={
              `\\text{circle is } \\pi, \\text{ so the ratio of points in the circle to the total}`
            } />

            <MathJax.Node formula={
              `\\text{number of points in the square is } \\frac{\\pi}{4},`
            } />

            <MathJax.Node formula={
              `\\text{which is why we compare } \\pi \\text{ to }`
            } />
            <MathJax.Node formula={
              `4 \\left(\\text{The Ratio Of Points in the Circle to Total Points}\\right)`
            } />

            <br />

            <MathJax.Node formula={
              `\\textbf{Note: } \\text{While the other tests are deterministic, meaning}`
            } />

            <MathJax.Node formula={
              `\\text{will always return the same result for the same number}`
            } />

            < MathJax.Node formula={
              `\\text{of tests, the Monte Carlo Method is probabilistic,}`
            } />

            < MathJax.Node formula={
              `\\text{meaning it depends on (pseudo)randomness and thus}`
            } />

            < MathJax.Node formula={
              `\\text{will have slightly different results each time.}`
            } />
          </MathJax.Provider>
        </Modal.Body>
      </Modal>
    </>
  )
}