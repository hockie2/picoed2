import React from 'react';
import PropTypes from 'prop-types';
import Chart from "react-google-charts";
import styles from '../style.module.scss';

class Charts extends React.Component {

    render(){
        const data = [
          ["", "", { role: "style" }],
          ["Funds Required", this.props.state.retirement_sum, "color: gray"],
          ["Funds Available", this.props.state.total_funds, "color: #76A7FA"],
          ["Gap", (this.props.state.total_surplus_shortfall*-1), "color: blue"]
        ];

        const options= {
              title: 'Retirement',
              vAxis: { title: "S$"},
              legend: "none",
              backgroundColor:'none'
        }

      return (
        <div className={`${this.props.chart_class} gap-3`}>
            <div className={styles.chart_canvas}>
                <Chart chartType="ColumnChart" width="100%" height="100%" data={data} options={options} />
            </div>
            <div className={`${styles.chart_footer} p-3 rounded-3 d-flex flex-column flex-sm-row justify-content-between gap-3 gap-sm-0`}>
                <div className={`${styles.chart_details} vstack`}>
                  Total Funds Required
                  <h3>S${this.props.total_funds}</h3>
                </div>
                <div className={`${styles.chart_details} vstack`}>
                  Total Current Funds Available 
                  <h3>S${this.props.retirement_sum}</h3>
                </div>
                <div className={`${styles.chart_details} vstack`}>
                  {this.props.total_surplus_shortfall_label}
                  <h3>S${this.props.total_surplus_shortfall}</h3>
                </div>
            </div>
            <button className={styles.edit} onClick={this.props.editForm}>Back to Edit</button>
        </div>
      );
    }
}

Charts.propTypes = {
  chart_class: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  total_funds: PropTypes.string.isRequired,
  retirement_sum: PropTypes.string.isRequired,
  total_surplus_shortfall: PropTypes.string.isRequired,
  total_surplus_shortfall_label: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired
};

export default Charts;