import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.scss';
import Dropdown from './dropdown/Dropdown';
import { CurrencyInfoInterface, CurrencyInterface } from './App.interface';

const App = () => {
	const [info, setInfo] = useState<CurrencyInfoInterface>({});
	const [input, setInput] = useState(100);
	const [from, setFrom] = useState("usd");
	const [to, setTo] = useState("pkr");
	const [options, setOptions] = useState<string[]>([]);
	const [output, setOutput] = useState<number>(198);

	useEffect(() => {
		const fetchCurrencies = () => {
			const get = async <T,>(url: string): Promise<T> => {
				const api = await Axios.get(url);
				return api.data as T;
			}
			get<CurrencyInterface>(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`).then
				((res) => {
					setInfo(res[from]);
					console.log(res)
				})
		}
		fetchCurrencies();
	}, [from]);

	useEffect(() => {
		setOptions(Object.keys(info));
		setOutput(input * info[to]);
	}, [info, input, to])

	const flip = () => {
		var temp = from;
		setFrom(to);
		setTo(temp)
	}

	return (
		<div className='cu-converter'>
			<div className="cu-app">
				<div className="cu-heading">
					<h1>Currency converter</h1>
				</div>
				<div className="cu-currency">
					<div className="cu-amount">
						<h3>Amount</h3>
						<input type="number" min={0}
							placeholder="Enter the amount" value={input}
							onChange={(e: any) => setInput(e.target.value)} />
					</div>
					<div className="cu-options">
						<div className="cu-option">
							<h3>From</h3>
							<Dropdown options={options}
								onChange={(e) => { setFrom(e) }}
								initial={from} />
						</div>
						<div onClick={flip}>flip</div>
						<div className="cu-option">
							<h3>To</h3>
							<Dropdown options={options}
								onChange={(e) => { setTo(e) }}
								initial={to} />
						</div>
					</div>
				</div>
				<div className="cu-result">
					<h2>Converted Amount:</h2>
					<p>{input + " " + from.toUpperCase() + " = " + output.toFixed(2) + " " + to.toUpperCase()}</p>

				</div>
			</div>
		</div>
	);
}

export default App;