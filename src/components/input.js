export function Input({ id, placeholder, onInputChange }) {
  const inputElement = document.createElement('input')
  inputElement.type = 'text'
  inputElement.id = id
  inputElement.placeholder = placeholder
  inputElement.className =
    'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'

  // Add event listener for input changes
  if (typeof onInputChange === 'function') {
    inputElement.addEventListener('input', (event) => onInputChange(event.target.value))
  } else {
    console.warn('onInputChange is not a function')
  }

  return inputElement
}
