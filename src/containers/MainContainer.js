import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state={stocks:[]}
  grabStocks(){
    fetch('http://localhost:3000/stocks')
    .then(res=>res.json())
    .then((stecks)=>{this.setState({stocks:stecks})})
  }
  handleClick=(id)=>{
    this.setState({
      stocks:this.state.stocks.map(stock=>{
      if(stock.id=== id ){
        return {...stock, owned:!stock.owned}
      }
      else{
        return stock
      }
    })

      
    })

  }
  render() {
   const portStock = this.state.stocks.filter(stock=> stock.owned===true)
   const stockStock = this.state.stocks.filter(stock=> stock.owned===false)
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={stockStock} handleClick={this.handleClick}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={portStock} handleClick={this.handleClick}/>

            </div>
          </div>
      </div>
    );
  }
  componentDidMount(){
    this.grabStocks()
  }
}

export default MainContainer;
