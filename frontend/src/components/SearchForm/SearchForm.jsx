import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.css';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
	const { setSearchTerm, setResultTitle } = useGlobalContext();
	const searchText = useRef('');
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		const tempSearchTerm = searchText.current.value.trim();

		if (tempSearchTerm.length === 0) {
			setSearchTerm('');
			setResultTitle('Please Enter Something...');
		} else {
			setSearchTerm(tempSearchTerm);
		}

		navigate('/book');
	};

	return (
		<div className="search-form">
			<div className="container">
				<div className="search-form-content">
					<div className="search-form">
						<div className="search-form-elem flex flex-sb bg-white">
							<input
								type="text"
								className="form-control"
								placeholder="search..."
								ref={searchText}
							/>
							<button
								type="submit"
								className="flex flex-c"
								onClick={handleSearch}
							>
								<FaSearch className="text-purple" size={32} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
