import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from '../TravelCard'

import {MainContainer, Heading, TravelCardContainer} from './styledComponents'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    packages: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.makingAPiCall()
  }

  renderLoadingView = () => (
    <div data-testid='loader'>
      <Loader type='TailSpin' color='#00BFFF' height={50} width={50} />
    </div>
  )

  makingAPiCall = async () => {
    const apiUrl = `https://apis.ccbp.in/tg/packages`
    const response = await fetch(apiUrl)
    console.log(response)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(product => ({
        id: product.id,
        name: product.name,
        imageUrl: product.image_url,
        description: product.description,
      }))
      this.setState({
        packages: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  render() {
    const {packages, apiStatus} = this.state
    return (
      <MainContainer>
        <Heading>Travel Guide</Heading>
        <TravelCardContainer>
          {apiStatus === apiStatusConstants.inProgress
            ? this.renderLoadingView()
            : packages.map(eachItem => (
                <TravelCard key={eachItem.id} travelCardDetails={eachItem} />
              ))}
        </TravelCardContainer>
      </MainContainer>
    )
  }
}

export default TravelGuide
