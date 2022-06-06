import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.scss';
import Dropdown from './dropdown/Dropdown';
import { CurrencyInfoInterface, CurrencyInterface } from './App.interface';
import Result from './result/Result';

const App = () => {
	const [info, setInfo] = useState<CurrencyInfoInterface>({});
	const [input, setInput] = useState(100);
	const [from, setFrom] = useState("usd");
	const [to, setTo] = useState("pkr");
	const [options, setOptions] = useState<string[]>([]);
	const [output, setOutput] = useState<number>(198);

	useEffect(() => {
		const fetchCurrencies = async () => {
			const httpGet = async <T,>(url: string): Promise<T> => {
				const api = await Axios.get(url);
				return api.data as T;
			}
			// fetch api
			const response = await httpGet<CurrencyInterface>
				(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`);
			setInfo(response[from]);
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
							<Dropdown id="dropdown-from" label="From" options={options}
								onChange={(e) => { setFrom(e) }}
								initial={from} />
						</div>
						<div onClick={flip}>flip</div>
						<div className="cu-option">
							<Dropdown id="dropdown-to" label="To" options={options}
								onChange={(e) => { setTo(e) }}
								initial={to} />
						</div>
					</div>
				</div>
				<Result input={input} from={from} output={output} to={to} />
			</div>
		</div>
	);
}

export default App;