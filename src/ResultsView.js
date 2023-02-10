import React from 'react'
import PropTypes from 'prop-types'
const ResultsView = ({results, resetView}) => {
  return (
    <div className="d-flex justify-content-center mt-4">
        <div className="card w-25 ">
            <div className='card-header'><h3>Results</h3></div>
            <div className='card-body'>
                <span className="d-block">{`Correct: ${results.correct}`}</span>
                <span className="d-block">{`Incorrect: ${results.incorrect}`}</span>
                <span className="d-block">{`Unanswered: ${results.unanswered}`}</span>
                <span className="d-block">{`Percentage Correct: ${results.percentage}`}</span>
            </div>
            <div className='text-center mb-2'>
                <button className="btn btn-primary" onClick={resetView}>Reset</button>
            </div>
            <div className='card-footer'><p>Only answered questions will be calculated in your percentage correct.</p></div>
        </div>
    </div>
  )
}

ResultsView.propTypes = {
    results : PropTypes.shape({
        correct: PropTypes.number,
        incorrect: PropTypes.number,
        unanswered: PropTypes.number,
        percentage: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }),
    resetView: PropTypes.func
}

export default ResultsView