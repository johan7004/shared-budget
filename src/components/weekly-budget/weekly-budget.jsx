import React from 'react';
import BudgetForms from '../Forms/budget-forms.component';

function WeeklyBudget() {
  return (
    <>
    <BudgetForms
    label='Enter your Budget'
    type="text"
    placeholder="Enter This Weeks Budget"
    formText="This budget is target for this week"
    />
    </>
  )
}

export default WeeklyBudget