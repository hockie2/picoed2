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
        <div className={this.props.chart_class}>
            <Chart chartType="ColumnChart" width="100%" height="600px" data={data} options={options} />
            <div className={styles.chart_footer}>
                <div className={styles.chart_details}>Total Funds Required <br/> S${this.props.total_funds}</div>
                <div className={styles.chart_details}>Total Current Funds Available <br/> S${this.props.retirement_sum}</div>
                <div className={styles.chart_details}>{this.props.total_surplus_shortfall_label} <br/> S${this.props.total_surplus_shortfall}</div>
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