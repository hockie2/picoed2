import React from "react";
// import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

import Calculator from "./components/calculator";
import styles from "./style.module.scss";
import folks from "./public/folks.png";

const initialState = {
  current_age: 0,
  retirement_age: 0,
  expected_monthly_expenses: 0,
  expected_yearly_expenses: 0,

  expected_lifespan: 0,
  yrs_to_retire: 0,
  inflation_rate: 0,
  interest_rate: 0,
  retirement_sum: 0,

  annual_income_aside: 0,
  projected_value: 0,

  insurance_value: 0,
  CPF_value: 0,
  other_assests_value: 0,
  total_funds: 0,
  total_surplus_shortfall: 0,

  formVisibility: true,
  chartVisibility: false,

  errorCurrent_age: "",
  errorRetirement_age: "",
  errorExpected_monthly_expenses: "",

  errorExpected_lifespan: "",

  errorAnnual_income_aside: "",

  errorInsurance_value: "",
  errorCPF_value: "",
  errorOther_assests_value: "",
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.editForm = this.editForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onChange(event) {
    //console.log('On Change')
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.calculate);
  }

  calculate() {
    //console.log('Calculate')

    //Expected yearly expenses required during retirement years////////////////////////////////////////////////////////////////////
    var expected_yearly_expenses = this.state.expected_monthly_expenses * 12;
    this.setState({ expected_yearly_expenses });

    //No of years to Retirement////////////////////////////////////////////////////////////////////////////////////////////////////
    var yrs_to_retire = this.state.retirement_age - this.state.current_age;
    this.setState({ yrs_to_retire });

    //Yearly Expenses at first year of retirement//////////////////////////////////////////////////////////////////////////////////
    var yearly_expenses_retirement =
      this.state.expected_yearly_expenses *
      (1 + this.state.inflation_rate / 100) ** yrs_to_retire;

    const rz =
      (1 + this.state.interest_rate / 100) /
        (1 + this.state.inflation_rate / 100) -
      1;
    const rzb = 1 + rz;
    const rzn = rzb ** -this.state.expected_lifespan;
    var retirement_sum;

    if (
      (this.state.inflation_rate === 0 && this.state.interest_rate === 0) ||
      this.state.inflation_rate === this.state.interest_rate
    ) {
      retirement_sum =
        yearly_expenses_retirement * this.state.expected_lifespan;
      this.setState({ retirement_sum });
    } else {
      retirement_sum = yearly_expenses_retirement * (((1 - rzn) / rz) * rzb);
      this.setState({ retirement_sum });
    }

    var annual_income_aside = parseFloat(this.state.annual_income_aside);
    this.setState({ annual_income_aside });

    //Projected value of your retirement savings in N years////////////////////////////////////////////////////////////////////////////
    var projected_value;

    if (this.state.interest_rate === 0) {
      projected_value = annual_income_aside * yrs_to_retire;
      this.setState({ projected_value });
    } else {
      projected_value =
        annual_income_aside *
        ((1 + this.state.interest_rate / 100) *
          (((1 + this.state.interest_rate / 100) ** yrs_to_retire - 1) /
            (this.state.interest_rate / 100)));
      this.setState({ projected_value });
    }

    //Total Surplus or Shortfall////////////////////////////////////////////////////////////////////////////////////////////////////////
    var insurance_value = parseFloat(this.state.insurance_value);
    var CPF_value = parseFloat(this.state.CPF_value);
    var other_assests_value = parseFloat(this.state.other_assests_value);

    var total_funds =
      insurance_value + CPF_value + other_assests_value + projected_value;
    var total_surplus_shortfall = total_funds - retirement_sum;
    this.setState({ total_funds, total_surplus_shortfall });
  }

  submitForm(event) {
    event.preventDefault();
    const isValid = this.validateForm();

    if (isValid) {
      //Hide Unhide Form
      this.state.formVisibility === true
        ? this.setState({ formVisibility: false })
        : this.setState({ formVisibility: true });

      //Hide Unhide Chart
      this.state.chartVisibility === true
        ? this.setState({ chartVisibility: false })
        : this.setState({ chartVisibility: true });
    }
  }

  editForm() {
    //Hide Unhide Form
    this.state.formVisibility === true
      ? this.setState({ formVisibility: false })
      : this.setState({ formVisibility: true });

    //Hide Unhide Chart
    this.state.chartVisibility === true
      ? this.setState({ chartVisibility: false })
      : this.setState({ chartVisibility: true });
  }

  validateForm() {
    // console.log('Validate')

    let errorCurrent_age = "";
    let errorRetirement_age = "";
    let errorExpected_monthly_expenses = "";
    let errorExpected_lifespan = "";
    let errorAnnual_income_aside = "";
    let errorInsurance_value = "";
    let errorCPF_value = "";
    let errorOther_assests_value = "";

    if (this.state.current_age <= 0) {
      errorCurrent_age = "*Invalid Input";
    }
    if (this.state.retirement_age <= 0) {
      errorRetirement_age = "*Invalid Input";
    }
    if (this.state.expected_monthly_expenses <= 0) {
      errorExpected_monthly_expenses = "*Invalid Input";
    }
    if (this.state.expected_lifespan <= 0) {
      errorExpected_lifespan = "*Invalid Input";
    }
    if (this.state.annual_income_aside <= 0) {
      errorAnnual_income_aside = "*Invalid Input";
    }
    if (this.state.insurance_value <= 0) {
      errorInsurance_value = "*Invalid Input";
    }
    if (this.state.CPF_value <= 0) {
      errorCPF_value = "*Invalid Input";
    }
    if (this.state.other_assests_value <= 0) {
      errorOther_assests_value = "*Invalid Input";
    }
    if (
      errorCurrent_age ||
      errorRetirement_age ||
      errorExpected_monthly_expenses ||
      errorExpected_lifespan ||
      errorAnnual_income_aside ||
      errorCPF_value ||
      errorOther_assests_value
    ) {
      this.setState({
        errorCurrent_age,
        errorRetirement_age,
        errorExpected_monthly_expenses,
        errorExpected_lifespan,
        errorAnnual_income_aside,
        errorInsurance_value,
        errorCPF_value,
        errorOther_assests_value,
      });
      return false;
    } else {
      this.setState({
        errorCurrent_age: "",
        errorRetirement_age: "",
        errorExpected_monthly_expenses: "",
        errorExpected_lifespan: "",
        errorAnnual_income_aside: "",
        errorInsurance_value: "",
        errorCPF_value: "",
        errorOther_assests_value: "",
      });
      return true;
    }
  }

  resetForm() {
    this.setState(initialState);
  }

  render() {
    return (
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-12 col-lg-5 col-xl-4 d-flex flex-column justify-content-around">
            <p className={styles.headerText}>Retirement Calculator</p>
            <div>
              <img
                src={folks}
                alt=""
                className={`img-fluid ${styles.folksMax}`}
              />
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xl-8">
            <Calculator
              onChange={this.onChange}
              submitForm={this.submitForm}
              editForm={this.editForm}
              state={this.state}
              resetForm={this.resetForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
