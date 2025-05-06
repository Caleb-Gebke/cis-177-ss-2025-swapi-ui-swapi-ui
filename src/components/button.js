export function createSearchButton({ text, onClick }) {
  const button = document.createElement('button')

  // Add Tailwind CSS classes for styling
  button.className =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300'
  button.textContent = text

  // Add an event listener for the button click
  button.addEventListener('click', onClick)

  return button
}

export function createSearchActionButton({ searchInputField, notesTextArea, formWrapper }) {
  const searchActionButton = createSearchButton({
    text: 'Search',
    onClick: async () => {
      const searchQuery = searchInputField.value.trim()
      if (!searchQuery) {
        const errorMessage = document.createElement('div')
        errorMessage.className = 'text-red-500 font-bold mt-4'
        errorMessage.textContent = 'Please enter a search term!'
        formWrapper.appendChild(errorMessage)
        return
      }

      try {
        const response = await fetch(`https://swapi.tech/api/people/?search=${searchQuery}`)
        const data = await response.json()

        if (data.results.length === 0) {
          const noResultsMessage = document.createElement('div')
          noResultsMessage.className = 'text-yellow-500 font-bold mt-4'
          noResultsMessage.textContent = 'No results found!'
          formWrapper.appendChild(noResultsMessage)
          return
        }

        notesTextArea.value = JSON.stringify(data.results, null, 2)
      } catch {
        const errorMessage = document.createElement('div')
        errorMessage.className = 'text-red-500 font-bold mt-4'
        errorMessage.textContent = 'An error occurred while fetching data!'
        formWrapper.appendChild(errorMessage)
      }
    },
  })

  searchActionButton.className =
    'bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300'

  return searchActionButton
}
