import React from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Charts from './charts';

import styles from '../style.module.scss';


class Calculator extends React.Component {


    numberWithCommas(x){
       return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


     render(){

        let expected_yearly_expenses = this.numberWithCommas(this.props.state.expected_yearly_expenses)
        let retirement_sum = this.numberWithCommas(this.props.state.retirement_sum)
        let projected_value = this.numberWithCommas(this.props.state.projected_value)
        let total_funds = this.numberWithCommas(this.props.state.total_funds)

        let total_surplus_shortfall = this.props.state.total_surplus_shortfall;
        let total_surplus_shortfall_label;
            if(total_surplus_shortfall<0){
                total_surplus_shortfall_label = 'Shortfall'
                total_surplus_shortfall = this.numberWithCommas(this.props.state.total_surplus_shortfall*-1)
            }
            else{
                total_surplus_shortfall_label = 'Surplus'
                total_surplus_shortfall = this.numberWithCommas(this.props.state.total_surplus_shortfall)
            }

    // Classes//////////////////////////////////////////////////////////////////////////////////////////////////
    const form_class = this.props.state.formVisibility? styles.form_wrapper : styles.form_wrapper_hidden
    const chart_class = this.props.state.chartVisibility? styles.chart_wrapper : styles.chart_wrapper_hidden

      return (
            <div className={styles.main_wrapper}>
                <form onSubmit={this.props.submitForm} className={form_class}>
                    <div className={styles.input_fields}>
                        Current age
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorCurrent_age}</span>
                            Years
                            <input type="number" name="current_age" value={this.props.state.current_age} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields}>
                        Retirement age
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorRetirement_age}</span>
                            Years
                            <input type="number" name="retirement_age" value={this.props.state.retirement_age} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields}>
                        <div className={styles.description}>Expected monthly expenses required during retirement years (in current values)</div>
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorExpected_monthly_expenses}</span>
                            S$
                            <input type="number" name="expected_monthly_expenses" value={this.props.state.expected_monthly_expenses} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields_bold}>
                        Expected yearly expenses required during retirement years
                        <span className={styles.span_readonly}>
                            S$
                            <input className={styles.input_fields_readonly} type="text" name="total_surplus_shortfall" value={expected_yearly_expenses} disabled />
                        </span>
                    </div>

                    <br/>
                    <div className={styles.input_fields}> Expected lifespan post-retirement
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorExpected_lifespan}</span>
                            Years
                            <input type="number" name="expected_lifespan" value={this.props.state.expected_lifespan} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields}>
                        Inflation rate
                        <span>
                            %
                            <input type="number" name="inflation_rate" value={this.props.state.inflation_rate} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields}>
                        Interest rate
                        <span>
                             %
                            <input type="number" name="interest_rate" value={this.props.state.interest_rate} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields_bold}>
                        Total sum required in {this.props.state.yrs_to_retire} years to fund your retirement
                        <span className={styles.span_readonly}>
                            S$
                            <input className={styles.input_fields_readonly} type="text" name="total_surplus_shortfall" value={retirement_sum} disabled />
                        </span>
                    </div>

                    <br/>
                    <div className={styles.input_fields}>
                        Annual income put aside for retirement
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorAnnual_income_aside}</span>
                            S$
                            <input type="number" name="annual_income_aside" value={this.props.state.annual_income_aside} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields_bold}>
                        Projected value of your retirement savings in {this.props.state.yrs_to_retire} years
                        <span className={styles.span_readonly}>
                            S$
                            <input className={styles.input_fields_readonly} type="text" name="total_surplus_shortfall" value={projected_value} disabled />
                        </span>
                    </div>


                    <br/>
                    <div className={styles.input_fields}>
                        Projected Value of Insurance Policies
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorInsurance_value}</span>
                            S$
                            <input type="number" name="insurance_value" value={this.props.state.insurance_value} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields}>
                        Projected CPF Savings
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorCPF_value}</span>
                            S$
                            <input type="number" name="CPF_value" value={this.props.state.CPF_value} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields}>
                        Projected Value of Other Assets
                        <span>
                            <span className={styles.errorMsg}>{this.props.state.errorOther_assests_value}</span>
                            S$
                            <input type="number" name="other_assests_value" value={this.props.state.other_assests_value} onChange={this.props.onChange} />
                        </span>
                    </div>
                    <div className={styles.input_fields_bold}>
                        Total {total_surplus_shortfall_label}
                        <span className={styles.span_readonly}>
                            S$
                            <input className={styles.input_fields_readonly} type="text" name="total_surplus_shortfall" value={total_surplus_shortfall} disabled />
                        </span>
                    </div>

                    <div className={styles.buttons_wrapper}>
                        <button type="submit">Proceed</button>
                        <p onClick={this.props.resetForm}>Reset</p>
                    </div>
                </form>
                <Charts
                    chart_class = {chart_class}
                    state = {this.props.state}
                    total_surplus_shortfall_label = {total_surplus_shortfall_label}
                    total_funds = {total_funds} retirement_sum={retirement_sum}
                    total_surplus_shortfall = {total_surplus_shortfall}
                    editForm = {this.props.editForm} />
            </div>
      );
    }
}

Calculator.propTypes = {
  state: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired
};


export default Calculator;