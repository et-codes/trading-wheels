export const currency = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatter.format(value);
}

export const percent = (value) => {
  return `${value.toFixed(2)}%`;
}

export const number = (value) => {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(value);
}