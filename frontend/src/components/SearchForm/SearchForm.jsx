import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';
import { searchBook } from '../../redux/apiRequest';

const SearchForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const searchText = useRef('');

	const handleSearch = async (e) => {
		e.preventDefault();
		const query = searchText.current.value;
		searchBook(query, dispatch, navigate);
	};

	return (
		<div className="search-form">
			<div className="container">
				<div className="search-form-content">
					<form className="search-form" method="get" onSubmit={handleSearch}>
						<div className="search-form-elem flex flex-sb bg-white">
							<input
								type="text"
								className="form-control"
								placeholder="search..."
								ref={searchText}
							/>
							<button type="submit" className="flex flex-c">
								<FaSearch className="text-purple" size={32} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
