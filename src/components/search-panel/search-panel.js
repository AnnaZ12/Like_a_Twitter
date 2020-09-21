import React, {Component} from 'react';
import './search-panel';

// объект будет содержать внутреннее состояние (что ввел пользователь), нужно переделать в класс
export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }
    onUpdateSearch(e) {
        const term = e.target.value;
        this.setState({term: term});
        // необходимо обновить state как здесь, так и в модуле app
        this.props.onUpdateSearch(term);
    }
    render() {
        return (
            <input
                className='form-control search-input'
                type='text'
                placeholder='Поиск по записям'
                onChange={this.onUpdateSearch}
            />
        )
    }
}