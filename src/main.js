// main.js
import { createSearchButton } from './components/button'
import { Input } from './components/input'
// Removed unused createLabel import
import TextArea from './components/textarea'

// Fetch Star Wars Data
async function fetchStarWarsData(endpoint) {
  const response = await fetch(`https://swapi.dev/api/${endpoint}/`)
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`)
  }
  return response.json()
}

// Initialize the app
function init() {
  const appContainer = document.getElementById('app')
  appContainer.className = 'container mx-auto p-4'

  // Header Section
  const appHeader = document.createElement('h1')
  appHeader.className = 'text-3xl font-bold text-center text-yellow-400 mb-6'
  appHeader.textContent = 'Star Wars API Explorer'
  appContainer.appendChild(appHeader)

  // Form Section
  const formWrapper = document.createElement('div')
  formWrapper.className = 'mb-6'
  appContainer.appendChild(formWrapper)

  // Search Input Field
  const searchInputField = Input({
    id: 'search-input',
    placeholder: 'Enter a keyword...',
    onInputChange: (value) => {
      console.log('Input changed:', value) // Handle the input change here
    },
  })
  searchInputField.className =
    'border border-blue-500 rounded px-4 py-2 w-full mb-4 bg-gray-900 text-blue-300 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  formWrapper.appendChild(searchInputField)

  // Notes Text Area
  const notesTextAreaWrapper = document.createElement('div')
  notesTextAreaWrapper.className = 'flex justify-center items-center h-screen'
  appContainer.appendChild(notesTextAreaWrapper)

  const notesTextArea = TextArea({
    id: 'notes',
    placeholder: 'Write your notes here...',
  })
  notesTextArea.className =
    'border border-gray-300 rounded px-4 py-2 w-3/4 h-96 bg-gray-100 shadow-lg'
  notesTextAreaWrapper.appendChild(notesTextArea)

  // Search Button
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
  formWrapper.appendChild(searchActionButton)

  // Button Section for Endpoints
  const endpointButtonGroup = document.createElement('div')
  endpointButtonGroup.className = 'flex justify-center space-x-4 mb-6'
  appContainer.appendChild(endpointButtonGroup)

  // Endpoint Buttons
  const apiEndpoints = ['people', 'planets', 'starships']
  apiEndpoints.forEach((endpoint) => {
    const endpointButton = createSearchButton({
      text: `Load ${endpoint}`,
      onClick: async () => {
        const endpointData = await fetchStarWarsData(endpoint)
        renderData(endpointData, contentGrid)
      },
    })
    endpointButton.className =
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    endpointButtonGroup.appendChild(endpointButton)
  })

  // Content Grid for Displaying Data
  const contentGrid = document.createElement('div')
  contentGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
  appContainer.appendChild(contentGrid)
}

// Function to render data into the content grid
function renderData(data, contentGrid) {
  contentGrid.innerHTML = '' // Clear previous content
  data.results.forEach((item) => {
    const itemCard = document.createElement('div')
    itemCard.className = 'bg-gray-800 text-white p-4 rounded shadow'
    itemCard.textContent = JSON.stringify(item, null, 2)
    contentGrid.appendChild(itemCard)
  })
}

// Run the app
document.addEventListener('DOMContentLoaded', init)
