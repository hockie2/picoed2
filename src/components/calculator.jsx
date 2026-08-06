import React from "react";
import PropTypes from "prop-types";
import Charts from "./charts";

import styles from "../style.module.scss";

class Calculator extends React.Component {
  numberWithCommas(x) {
    if (x === undefined || x === null) return "0.00";
    return Number(x).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let expected_yearly_expenses = this.numberWithCommas(
      this.props.state.expected_yearly_expenses
    );
    let retirement_sum = this.numberWithCommas(this.props.state.retirement_sum);
    let projected_value = this.numberWithCommas(
      this.props.state.projected_value
    );
    let total_funds = this.numberWithCommas(this.props.state.total_funds);

    let total_surplus_shortfall = this.props.state.total_surplus_shortfall;
    let total_surplus_shortfall_label;
    if (total_surplus_shortfall < 0) {
      total_surplus_shortfall_label = "Shortfall";
      total_surplus_shortfall = this.numberWithCommas(
        this.props.state.total_surplus_shortfall * -1
      );
    } else {
      total_surplus_shortfall_label = "Surplus";
      total_surplus_shortfall = this.numberWithCommas(
        this.props.state.total_surplus_shortfall
      );
    }

    const form_class = this.props.state.formVisibility
      ? styles.form_wrapper
      : styles.form_wrapper_hidden;
    const chart_class = this.props.state.chartVisibility
      ? styles.chart_wrapper
      : styles.chart_wrapper_hidden;

    return (
      <div className={styles.main_wrapper + " px-3 px-md-5 py-3 py-md-4"}>
        <form onSubmit={this.props.submitForm} className={`${form_class} container-fluid px-0`}>
          
          {/* Current age */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Current age
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="current_age"
                  value={this.props.state.current_age}
                  onChange={this.props.onChange}
                />
                <span className="input-group-text">Years</span>
              </div>
              {this.props.state.errorCurrent_age && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorCurrent_age}
                </div>
              )}
            </div>
          </div>

          {/* Retirement age */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Retirement age
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="retirement_age"
                  value={this.props.state.retirement_age}
                  onChange={this.props.onChange}
                />
                <span className="input-group-text">Years</span>
              </div>
              {this.props.state.errorRetirement_age && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorRetirement_age}
                </div>
              )}
            </div>
          </div>

          {/* Expected monthly expenses */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Expected monthly expenses required during retirement years (in current values)
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="number"
                  className="form-control"
                  name="expected_monthly_expenses"
                  value={this.props.state.expected_monthly_expenses}
                  onChange={this.props.onChange}
                />
              </div>
              {this.props.state.errorExpected_monthly_expenses && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorExpected_monthly_expenses}
                </div>
              )}
            </div>
          </div>

          {/* Expected yearly expenses (Readonly) */}
          <div className="row mb-3 align-items-center fw-bold">
            <label className="col-12 col-md-6 form-label mb-1 mb-md-0">
              Expected yearly expenses required during retirement years
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="text"
                  className="form-control bg-light fw-bold"
                  value={expected_yearly_expenses}
                  disabled
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Expected lifespan */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Expected lifespan post-retirement
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="expected_lifespan"
                  value={this.props.state.expected_lifespan}
                  onChange={this.props.onChange}
                />
                <span className="input-group-text">Years</span>
              </div>
              {this.props.state.errorExpected_lifespan && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorExpected_lifespan}
                </div>
              )}
            </div>
          </div>

          {/* Inflation rate */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Inflation rate
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="inflation_rate"
                  value={this.props.state.inflation_rate}
                  onChange={this.props.onChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>

          {/* Interest rate */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Interest rate
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="interest_rate"
                  value={this.props.state.interest_rate}
                  onChange={this.props.onChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>

          {/* Retirement sum required (Readonly) */}
          <div className="row mb-3 align-items-center fw-bold">
            <label className="col-12 col-md-6 form-label mb-1 mb-md-0">
              Total sum required in {this.props.state.yrs_to_retire} years to fund your retirement
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="text"
                  className="form-control bg-light fw-bold"
                  value={retirement_sum}
                  disabled
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Annual income put aside */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Annual income put aside for retirement
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="number"
                  className="form-control"
                  name="annual_income_aside"
                  value={this.props.state.annual_income_aside}
                  onChange={this.props.onChange}
                />
              </div>
              {this.props.state.errorAnnual_income_aside && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorAnnual_income_aside}
                </div>
              )}
            </div>
          </div>

          {/* Projected value (Readonly) */}
          <div className="row mb-3 align-items-center fw-bold">
            <label className="col-12 col-md-6 form-label mb-1 mb-md-0">
              Projected value of your retirement savings in {this.props.state.yrs_to_retire} years
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="text"
                  className="form-control bg-light fw-bold"
                  value={projected_value}
                  disabled
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Insurance value */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Projected Value of Insurance Policies
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="number"
                  className="form-control"
                  name="insurance_value"
                  value={this.props.state.insurance_value}
                  onChange={this.props.onChange}
                />
              </div>
              {this.props.state.errorInsurance_value && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorInsurance_value}
                </div>
              )}
            </div>
          </div>

          {/* CPF value */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Projected CPF Savings
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="number"
                  className="form-control"
                  name="CPF_value"
                  value={this.props.state.CPF_value}
                  onChange={this.props.onChange}
                />
              </div>
              {this.props.state.errorCPF_value && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorCPF_value}
                </div>
              )}
            </div>
          </div>

          {/* Other assets value */}
          <div className="row mb-3 align-items-center">
            <label className="col-12 col-md-6 form-label fw-medium mb-1 mb-md-0">
              Projected Value of Other Assets
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="number"
                  className="form-control"
                  name="other_assests_value"
                  value={this.props.state.other_assests_value}
                  onChange={this.props.onChange}
                />
              </div>
              {this.props.state.errorOther_assests_value && (
                <div className="text-danger small mt-1">
                  {this.props.state.errorOther_assests_value}
                </div>
              )}
            </div>
          </div>

          {/* Total Surplus / Shortfall (Readonly) */}
          <div className="row mb-4 align-items-center fw-bold">
            <label className="col-12 col-md-6 form-label mb-1 mb-md-0">
              Total {total_surplus_shortfall_label}
            </label>
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text">S$</span>
                <input
                  type="text"
                  className="form-control bg-light fw-bold"
                  value={total_surplus_shortfall}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className={`${styles.buttonWrapper} d-flex align-items-center gap-3 mt-4`}>
            <button type="submit" className={`${styles.submitButton}`}>Proceed</button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.props.resetForm}
            >
              Reset
            </button>
          </div>
        </form>

        <Charts
          chart_class={chart_class}
          state={this.props.state}
          total_surplus_shortfall_label={total_surplus_shortfall_label}
          total_funds={total_funds}
          retirement_sum={retirement_sum}
          total_surplus_shortfall={total_surplus_shortfall}
          editForm={this.props.editForm}
        />
      </div>
    );
  }
}

Calculator.propTypes = {
  state: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
};

export default Calculator;