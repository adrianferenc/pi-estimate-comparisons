import { useState } from "react";
import MathJax from 'react-mathjax';
import { Card, Carousel, Modal } from 'react-bootstrap';
import './LeibnizFormula.css'

export default function LeibnizFormula({ n, leibnizFormulaData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const outputArray = [];
  for (let i = 0; i < Math.ceil(n / 10); i++) {
    outputArray.push(
      <Carousel.Item style={{
        marginRight: "250px",
        height: '100px',
        overflow: 'hidden',
        width: '100%'
      }}>
        <MathJax.Provider style={{ width: "100%" }}>
          <MathJax.Node formula={
            [i === 0 ? '' : '+'] +
            leibnizFormulaData.odds
              .slice(10 * i, Math.min(10 * (i + 1), n))
              .map(x => x.toString().length < 7 ? `\\underset{${leibnizFormulaData.partialSum[(x - 1) / 2].toFixed(5)}}{\\frac{1}{${x}}}` : `\\underset{${leibnizFormulaData.partialSum[(x - 1) / 2].toFixed(5)}}{\\frac{1}{${Math.sqrt(x)}^2}}`)
              .map((x, idx) => idx % 2 === 0 ? (idx > 0 ? ` + ${x}` : x) : ` - ${x}`).join('')
          } />
        </MathJax.Provider>
      </Carousel.Item>
    )
  }

  return (
    <>
      <Card>
        <Card.Title>
          <span style={{ display: "flex", justifyContent: "center", margin: "0 30px" }}>
            The Leibniz Formula
          </span>
          <span onClick={handleShow} style={{ position: "absolute", right: "0", top: "0", cursor: "pointer" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </span>
        </Card.Title>

        <Carousel interval={null} slide={false} indicators={false}>
          {outputArray}
        </Carousel>

        <MathJax.Provider>
          <MathJax.Node formula={
            `\\text{The Partial Sum Equals } ${leibnizFormulaData.odds.map((x, idx) => (-1) ** (idx) * 1 / x).reduce((a, c) => a + c, 0)}`
          } />
          <MathJax.Node formula={
            `\\left|\\pi - 4 \\left(\\text{The Partial Sum}\\right)\\right| = ${Math.abs(Math.PI - 4 * leibnizFormulaData.odds.map((x, idx) => (-1) ** (idx) * 1 / x).reduce((a, c) => a + c, 0))}`
          } />
        </MathJax.Provider>

      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Leibniz Formula</Modal.Title>
        </Modal.Header>
        <Modal.Body>Info about <a href="https://en.wikipedia.org/wiki/Leibniz_formula_for_%CF%80">the Leibniz Formula</a> TK</Modal.Body>
      </Modal>
    </>
  )
}