// ## EXEMPLO 1 ##
// import React, {Component, useState } from 'react';
// const App = () => {
//   const [count, setCount] = useState(0);
//
//   const increment = () => {
//     setCount(count + 1)
//   };
//
//   return (
//       <div className="container mt-3">
//         <h2>Counter App</h2>
//         <button onClick={increment} className="btn btn-primary">
//           Clicked {count} times!
//         </button>
//       </div>
//   );
// };

// ## EXEMPLO 2 ##
// import React, {Component} from 'react';
// class App extends Component {
//
//     state = {
//         count: 0
//     };
//
//     increment = () => {
//         this.setState({
//             count: this.state.count + 1
//         });
//     };
//
//     render() {
//         return (
//
//             <div className="container mt-3">
//                 <h2>Counter App</h2>
//                 <button onClick={this.increment} className="btn btn-primary">
//                     Clicked {this.state.count} times!
//                 </button>
//             </div>
//
//         );
//     }
// }

// ## EXEMPLO 3 ##
// import React, {Component} from 'react';
//
// class App extends Component {
//
//     state = {
//         count: 0
//     };
//
//     increment = () => {
//         this.setState({
//             count: this.state.count + 1
//         });
//     };
//
//     componentDidMount() {
//         document.title = `Clicked ${this.state.count} times!`
//     }
//
//     componentDidUpdate() {
//         document.title = `Clicked ${this.state.count} times!`
//     }
//
//     render() {
//         return (
//
//             <div className="container mt-3">
//                 <h2>Counter App</h2>
//                 <button onClick={this.increment} className="btn btn-primary">
//                     Clicked {this.state.count} times!
//                 </button>
//             </div>
//
//         );
//     }
// }

// ## EXEMPLO 4 ##
// import React, {Component, useState, useEffect } from 'react';
// const App = () => {
//   const [count, setCount] = useState(0);
//
//   useEffect(() => {
//     document.title = `Clicked ${count} times!`
//   });
//
//   const increment = () => {
//     setCount(count + 1)
//   };
//
//   return (
//       <div className="container mt-3">
//         <h2>Counter App</h2>
//         <button onClick={increment} className="btn btn-primary">
//           Clicked {count} times!
//         </button>
//       </div>
//   );
// };

// ## EXEMPLO 5 - NEWS API ##
import React, {Component, useState, useEffect} from 'react';

const App = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('react');
    const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
    const [loading, setLoading] = useState(false);

    const fetchNews = () => {
        setLoading(true);
        fetch(url)
            .then(result => result.json())
            .then(data => setNews(data.hits), setLoading(false))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchNews();
    }, [url]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
    };

    const showLoading = () => (loading ? <h2>Loading...</h2> : "");

    const searchForm = () => (
        <form className="form-inline mb-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <input className="form-control mr-3" type="text" value={searchQuery} onChange={handleChange}/>
                <button className="btn btn-outline-primary">Pesquisar</button>
            </div>
        </form>
    );

    const showNews = () => news.map((n, i) => (<p key={i}><a href={n.url} className="btn btn-outline-primary">{n.title}</a></p>));

    return (
        <div className="container mt-3">
            <h2>Notícias</h2>
            {showLoading()}
            {searchForm()}
            {showNews()}
        </div>
    );
};

export default App;
