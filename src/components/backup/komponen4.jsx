import React from 'react';
import '../assets/styles/komponen4.css';

var images = ["http://www.trazeetravel.com/wp-content/uploads/2015/10/Big-Major-Cay-Bahamas-%C2%A9-Katie-Smith-Dreamstime-33201195-e1444248381801-1000x399.jpg", "https://i.pinimg.com/originals/9b/70/69/9b7069440538e120d7005af3b18d08bf.jpg", "https://media.cntraveler.com/photos/56a7a68878d099fc1224f308/master/pass/big-major-cay-pig-cr-getty.jpg", "http://www.slate.com/content/dam/slate/blogs/atlas_obscura/2014/06/09/the_swimming_pigs_of_big_major_cay_in_the_bahamas/7875531868_9f9ec85b6b_o.jpg.CROP.promo-large2.jpg", "https://i.ytimg.com/vi/W-PBFMECvTE/maxresdefault.jpg", "https://static.pexels.com/photos/109009/squirrel-grey-brown-fur-109009.jpeg", "https://img-aws.ehowcdn.com/877x500p/photos.demandstudios.com/getty/article/223/249/488872871.jpg", "https://img.huffingtonpost.com/asset/5834c55a1700002600e7bf13.jpeg?ops=scalefit_720_noupscale", "https://data.whicdn.com/images/10429808/large.jpg", "http://www.catster.com/wp-content/uploads/2015/06/8-Cats-sweat-through-paws-shutterstock_207995587.jpg", "https://fmlainsights.lexblogplatformthree.com/wp-content/uploads/sites/311/2011/04/catpaw.jpg", "https://i.ytimg.com/vi/W-PBFMECvTE/maxresdefault.jpg"];

class ImageList extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      images,
      fadedleft: true,
      fadedright: false,
      start: 0,
      finish: 5
    }
  }

  leftClick() {
    let start = this.state.start;
    let finish = this.state.finish;
    if (start > 0 && finish > 0) {
        this.setState({
          start: start - 5,
          finish: finish - 5,
        });
    } else {
      this.setState({
        fadedleft: true
      });
    }

    this.setState({
      fadedright: false
    })
    
  }

  rightClick() {
    let start = this.state.start;
    let finish = this.state.finish;
    if (finish < images.length) {
      this.setState({
        start: start + 5,
        finish: finish + 5
      });
    } else {
      this.setState({
        fadedright: true
      });
    }
    
    this.setState({
      fadedleft: false
    });
  }
    
  render() {
    

    var startindex = this.state.start;
    var finishindex = this.state.finish;
    const fadedleft = this.state.fadedleft ? "arrow-left faded-left" : "arrow-left";
    const fadedright = this.state.fadedright ? "arrow-right faded-right" : "arrow-right";
    return (
      <div className="container">
        <div className="slideshow row col-md-12">
          <div className={fadedleft} onClick={this.leftClick.bind(this)}></div>
          {
            this.state.images.slice(startindex, finishindex).map((image, imageindex) => {
              return (
                <div key={imageindex}>
                  <img className="image" src={image} />
                </div>
              )
            })
          }
          <div className={fadedright} onClick={this.rightClick.bind(this)}></div>
        </div>
      </div>
    )
  }
};


export default ImageList;