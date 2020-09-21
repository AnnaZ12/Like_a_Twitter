import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // эмуляция получения данных с сревера
            data: [
                {label: 'Going to learn React', important: false, like: false, id: 1},
                {label: 'That is so good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}        
            ],
            term: '',
            filter: 'all'
        };
        // чтобы функции работали, нужно привязать обработчик события
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    // удаление поста
    deleteItem(id) {
        //передаем новое состояние массива в state, где лежит исходный массив
        this.setState(({data}) => {
            // elem - каждый элемент массива. сравниваем id массива с тем, что был нажат
            const index = data.findIndex(elem => elem.id === id);

            // разбиваем массив на до удаленного элемента и после
            // соединяем обе части
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            // Важно: мы не изменили текущее состояние элемента, а заменили его на новый
            return{
                data: newArr
            };
        });
    }

    // добавление нового поста
    addItem(body) {
        // тело нового поста
        const newItem = {
            label: body,
            important: false,
            // вручную формируем уникальный id у поста
            id: this.maxId++
        };
        this.setState(({data}) => {
            // через spread оператор добавляем все аргументы, что есть в текущем массиве и добавляем новый айтем
            const newArr = [...data, newItem];
            return {
                data:newArr
            };
        });
    }

    // тоггл избранного
    onToggleImportant(id) {
        this.setState(({data}) => {
            // сравниваем id важного поста с id элементов массива, получаем совпадающий индекс
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            };
        });
    }

    // тоггл лайка
    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            };
        });
    }

    // поиск по постам
    searchPost(items, term) {
        // если запрос пустой - отрисовка текущих карточек
        if (term.length === 0) {
            return items;
        }

        // если нет - проверка введенных данных, выгрузка в новый массив
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }

    // фильтр лайкнутых постов
    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }
    // просто обновляет state так же как в модуле search-panel
    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }
    
    render() {
        const {data, term, filter} = this.state,
              liked = data.filter(item => item.like).length,
              allPosts = data.length;
        // формируем видимые посты как результат запроса, либо переключения кнопок меню
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className='app'>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/> 
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
    
            )
    }

}