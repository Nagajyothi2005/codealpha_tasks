function calculateAge() {
  const dobInput = document.getElementById('dob').value;
  const error = document.getElementById('error');
  const result = document.getElementById('result');

  error.textContent = '';
  result.textContent = '';

  if (!dobInput) {
    error.textContent = 'Please select your date of birth.';
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    error.textContent = 'Date of birth cannot be in the future.';
    return;
  }

  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  result.textContent = `🎉 You are ${ageYears} Years, ${ageMonths} Months, and ${ageDays} Days old!`;
}
