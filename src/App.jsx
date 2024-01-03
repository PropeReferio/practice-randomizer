import { useState } from 'react'
import './App.css'
import CSVDataTable from './CSVDataTable'

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [csvData, setCsvData] = useState([]);
	const [numPracticeItems, setNumPracticeItems] = useState([]);

	const handleNumberChange = (event) => {
		const numRows = event.target.valueAsNumber
		console.log(numRows);
		setNumPracticeItems(numRows + 1);
	}

  const handleFileChange = (event) => {
	const file = event.target.files[0];
  
	if (file) {
		const reader = new FileReader();
  
		reader.onload = (e) => {
			const csvText = e.target.result;
			parseCSV(csvText);
		};
  
		reader.readAsText(file);
	}
  };

	const parseCSV = (csvText) => {
		const lines = csvText.split("\n");
		const headers = lines[0].split(",");
		const parsedData = [];
		const numLines = lines.length;

		const rowIndicesToDisplay = new Set()
		while (rowIndicesToDisplay.size < numPracticeItems) {
			rowIndicesToDisplay.add(getRandomInt(1, numLines))
		}
		console.log(rowIndicesToDisplay);

		const iterator1 = rowIndicesToDisplay.values();
	
		for (let i = 0; i < rowIndicesToDisplay.size; i++) {
			const lineIndex = iterator1.next().value;
			const currentLine = lines[lineIndex].split(",");
	
			if (currentLine.length === headers.length) {
				const row = {};
				for (let j = 0; j < headers.length; j++) {
					row[headers[j].trim()] = currentLine[j].trim();
				}
				parsedData.push(row);
			}
		}
	
		setCsvData(parsedData);
	}

  return (
		<div>
			<div style={{ marginBottom: "15px" }}>
				<input type="number" onChange={handleNumberChange}></input>
				<p>Youll have <span>{numPracticeItems - 1}</span> things to practice.</p>
				<input type="file" onChange={handleFileChange} accept=".csv" />
			</div>
			<CSVDataTable data={csvData} />
		</div>
	);
}

export default App;
