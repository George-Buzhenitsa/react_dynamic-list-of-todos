import React, { useState } from 'react';

interface Props {
  setSelectedParam: (value: string) => void;
  setInputParam: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ setSelectedParam, setInputParam }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('all');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInputParam(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setSelectedParam(event.target.value);
  };

  const resetFilters = () => {
    setInputValue('');
    setInputParam('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedValue}
            onChange={handleSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetFilters}
            />
          )}
        </span>
      </p>
    </form>
  );
};
