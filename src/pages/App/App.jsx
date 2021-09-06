import { useState } from "react";
import QuarterCircleLE from "../../components/QuarterCircleLE/QuarterCircleLE.jsx"
import QuarterCircleRE from "../../components/QuarterCircleRE/QuarterCircleRE.jsx"
import MonteCarlo from "../../components/MonteCarlo/MonteCarlo.jsx";
import BaselProblem from "../../components/BaselProblem/BaselProblem.jsx";
import LeibnizFormula from "../../components/LeibnizFormula/LeibnizFormula.jsx";
import NilakanthaFormula from "../../components/NilakanthaFormula/NilakanthaFormula.jsx";
import { Button, Form, Row, Col } from 'react-bootstrap';


export default function App() {

  // State
  const [n, setN] = useState(1000);
  const [graphData, setGraphData] = useState(
    {
      leftEndpoints: arrayOfLength(n).map(x => x / (n - 1)),
      rightEndpoints: arrayOfLength(n).map(x => x / (n - 1)),
      quarterCircle: arrayOfLength(n).map(x => x / (n - 1)).map(x => Math.sqrt(1 - x ** 2)),
      leftBarHeight: arrayOfLength(n).map(x => x / (n - 1)).map(x => Math.sqrt(1 - x ** 2)),
      leftBarArea: arrayOfLength(n).map(x => `Area is ${((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2)).toFixed(5)}`),
      leftTotalArea: arrayOfLength(n).map(x => ((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2))).reduce((a, c) => a + c, 0),
      rightBarHeight: arrayOfLength(n).map(x => x + 1).map(x => x / (n - 1)).map(x => Math.sqrt(1 - x ** 2)),
      rightBarArea: arrayOfLength(n).map(x => x + 1).map(x => `Area is ${((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2)).toFixed(5)}`),
      rightTotalArea: arrayOfLength(n).map(x => x + 1).map(x => ((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2))).filter(x => !isNaN(x)).reduce((a, c) => a + c, 0),

    }
  )
  const [monteCarloPoints, setMonteCarloPoints] = useState(arrayOfLength(n).map(x => [2 * Math.random() - 1, 2 * Math.random() - 1]))
  const [monteCarloData, setMonteCarloData] = useState(
    {
      insidePointsX: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 < 1).map(x => x[0]),
      insidePointsY: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 < 1).map(x => x[1]),
      outsidePointsX: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 > 1).map(x => x[0]),
      outsidePointsY: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 > 1).map(x => x[1]),
    }
  )

  const [baselProblemData, setBaselProblemData] = useState({
    squares: arrayOfLength(n).map(x => (x + 1) ** 2),
    partialSum: arrayOfLength(n).map(x => (x + 1)).map(x => 1 / (x ** 2)).reduce(
      ([arr, sum], el) => {
        const next = sum + el
        arr.push(next)
        return [arr, next]
      },
      [[], 0]
    )[0],
  })

  const [leibnizFormulaData, setLeibnizFormulaData] = useState({
    odds: arrayOfLength(n).map(x => 2 * x + 1),
    partialSum: arrayOfLength(n).map(x => 2 * x + 1).map((x, idx) => (-1) ** (idx) * 1 / (x)).reduce(
      ([arr, sum], el) => {
        const next = sum + el
        arr.push(next)
        return [arr, next]
      },
      [[], 0]
    )[0],
  })


  const [nilakanthaFormulaData, setNilakanthaFormulaData] = useState({
    odds: arrayOfLength(n).map(x => 2 * x + 3),
    partialSum: arrayOfLength(n).map(x => 2 * x + 3).map(x => 4 / (x ** 3 - x)).reduce(
      ([arr, sum], el) => {
        const next = sum + el
        arr.push(next)
        return [arr, next]
      },
      [[], 3]
    )[0],
  })

  const [inputValue, setInputValue] = useState(n);



  //Functions
  function arrayOfLength(x) {
    const output = [];
    for (let i = 0; i < x; i++) {
      output.push(i)
    }
    return output
  }
  async function handleChange(event) {
    setInputValue(event.target.value);
  };
  async function handleClick(event) {
    event.preventDefault();
    setN(inputValue)
    setGraphData({
      leftEndpoints: arrayOfLength(n).map(x => x / (n - 1)),
      rightEndpoints: arrayOfLength(n).map(x => x / (n - 1)),
      quarterCircle: arrayOfLength(n).map(x => x / (n - 1)).map(x => Math.sqrt(1 - x ** 2)),
      leftBarHeight: arrayOfLength(n).map(x => x / (n - 1)).map(x => Math.sqrt(1 - x ** 2)),
      leftBarArea: arrayOfLength(n).map(x => `Area is ${((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2)).toFixed(5)}`),
      leftTotalArea: arrayOfLength(n).map(x => ((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2))).reduce((a, c) => a + c, 0),
      rightBarHeight: arrayOfLength(n).map(x => x + 1).map(x => x / (n - 1)).map(x => Math.sqrt(1 - x ** 2)),
      rightBarArea: arrayOfLength(n).map(x => x + 1).map(x => `Area is ${((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2)).toFixed(5)}`),
      rightTotalArea: arrayOfLength(n).map(x => x + 1).map(x => ((1 / (n - 1)) * Math.sqrt(1 - (x / (n - 1)) ** 2))).filter(x => !isNaN(x)).reduce((a, c) => a + c, 0),
    })
    setMonteCarloPoints(arrayOfLength(n).map(x => [2 * Math.random() - 1, 2 * Math.random() - 1]))
    setMonteCarloData(
      {
        insidePointsX: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 < 1).map(x => x[0]),
        insidePointsY: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 < 1).map(x => x[1]),
        outsidePointsX: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 > 1).map(x => x[0]),
        outsidePointsY: monteCarloPoints.filter(x => x[0] ** 2 + x[1] ** 2 > 1).map(x => x[1]),
      }
    )
    setBaselProblemData(
      {
        squares: arrayOfLength(n).map(x => (x + 1) ** 2),
        partialSum: arrayOfLength(n).map(x => (x + 1)).map(x => 1 / (x ** 2)).reduce(
          ([arr, sum], el) => {
            const next = sum + el
            arr.push(next)
            return [arr, next]
          },
          [[], 0]
        )[0],
      }
    )
    setLeibnizFormulaData(
      {
        odds: arrayOfLength(n).map(x => 2 * x + 1),
        partialSum: arrayOfLength(n).map(x => 2 * x + 1).map((x, idx) => (-1) ** (idx) * 1 / (x)).reduce(
          ([arr, sum], el) => {
            const next = sum + el
            arr.push(next)
            return [arr, next]
          },
          [[], 0]
        )[0],
      }
    )

    setNilakanthaFormulaData({
      odds: arrayOfLength(n).map(x => 2 * x + 3),
      partialSum: arrayOfLength(n).map(x => 2 * x + 3).map(x => 4 / (x ** 3 - x)).reduce(
        ([arr, sum], el) => {
          const next = sum + el
          arr.push(next)
          return [arr, next]
        },
        [[], 3]
      )[0],
    })


  }

  return (
    <div className='app align-self-center'>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form className="text-center" onClick={handleClick}>
            <Form.Group>
              <Form.Label>Set the value of n</Form.Label>
              <Form.Control className="text-center" type="text" value={inputValue} onChange={handleChange} />
              <Button variant="primary" type="submit" >Change n</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <QuarterCircleLE n={n} graphData={graphData} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <QuarterCircleRE n={n} graphData={graphData} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <MonteCarlo n={n} monteCarloData={monteCarloData} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <BaselProblem n={n} baselProblemData={baselProblemData} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <LeibnizFormula n={n} leibnizFormulaData={leibnizFormulaData} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <NilakanthaFormula n={n} nilakanthaFormulaData={nilakanthaFormulaData} />
        </Col>
      </Row>
    </div>
  );
}
