import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from 'react-animated-popup';

function Home() {

    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const seeMoreContainer = useRef(null);

    const [cardData, setCardData] = useState([]);
    const navigate = useNavigate()

    const seeMore = (event) => {
        event.preventDefault();
        if(show){
            setShow(!show);
        }
        var elem = document.getElementById("seemorecontainer");
        elem.classList.remove('onloadhide');
        elem.classList.toggle('hide');
    }

    const cancelPopup = (event) => {
        event.preventDefault();
        setVisible(false)
    }

    const [colorCode, setColorCode] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const colorChoice = (colorCode) => {
        setColorCode(colorCode);
    }

    const submitCard = (event)=>{
        event.preventDefault();

        const request = { colorCode, title, description };

        axios.post("http://localhost:5000/addCard", request)
        .then((data)=>{
            if(data){
                navigate(0)
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const getAllCards = async () => {
        const setAllCards = await axios.get("http://localhost:5000/userAllCards")
        setCardData(setAllCards.data.userAllCards)
      }
    
      useEffect(() => {
        getAllCards()
      }, [])

    return (
        <div>
            <div className='container mt-5 col-lg-8 col-sm-10' >
                <div className="form-outline mx-auto">
                    <input type="search" id="form1" className="form-control rounded-pill" placeholder="&#xF002; Search" aria-label="Search" style={{ fontFamily: "Arial , FontAwesome" }} />
                </div>
            </div>
            <div className='container'>
                <div className='col-lg-6 mx-auto mt-3 px-2'>
                    {!show ? <div className='d-flex justify-content-center d-grid'>
                        <button onClick={() => setVisible(true)} id='btn1' className="btn text-white" style={{ backgroundColor: "#666666" }}><h6>Create a colour card</h6></button>
                    </div> : null}

                    <Popup visible={visible} onClose={() => setVisible(false)} className='form-container-outer container p-2 mt-1 rounded-3 col-lg-8' style={{ backgroundColor: "rgb(60 56 56);", width: "99vw" }} id='content'>
                        <h6 className='text-center'>Create a colour card</h6>
                        <h6 className='text-center mt-3'>Select the colour</h6>
                        {/* onSubmit={(event) => saveCard(event)} */}
                        <form onSubmit={(event)=>submitCard(event)} className='form-container' id='cardForm'>
                            <div className='text-center mt-2'>
                                <span className='me-2 btn' value="#0033FF" style={{ backgroundColor: "#0033FF", color: "#0033FF" }} onClick={() => colorChoice('#0033FF')}></span>
                                <span className='me-2 btn' value="#FF0000" style={{ backgroundColor: "#FF0000", color: "#FF0000" }} onClick={() => colorChoice('#FF0000')}></span>
                                <span className='me-2 btn' value="#F8ED62" style={{ backgroundColor: "#F8ED62", color: "#F8ED62" }} onClick={() => colorChoice('#F8ED62')}></span>
                                <span className='me-2 btn' value="#C8A2C8" style={{ backgroundColor: "#C8A2C8", color: "#C8A2C8" }} onClick={() => colorChoice('#C8A2C8')}></span>
                                <span className='btn' value="#CD7F32" style={{ backgroundColor: "#CD7F32", color: "#CD7F32" }} onClick={() => colorChoice('#CD7F32')}></span>
                            </div>
                            <div className='container'>
                                <h6 className='text-center mt-4 text-white'>Give a title</h6>
                                <div className='mx-auto'>
                                    <input onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" id="exampleInputPassword1" style={{ backgroundColor: "#b3b3b3", border: "none" }} required />
                                </div>
                                <h6 className='text-center mt-4 text-white'>Description</h6>
                                <div className="mx-auto form-floating">
                                    <textarea onChange={(event) => setDescription(event.target.value)} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px", backgroundColor: "#b3b3b3", border: "none" }} required></textarea>
                                    <label for="floatingTextarea2">Comments</label>
                                </div>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto d-flex mt-5 mb-2 justify-content-center">
                                <button className="btn fw-bold btn-sm px-4 me-3 rounded-3" type="submit" style={{ color: colorCode , backgroundColor: "#ffffff" }} >Save</button>
                                <button visible={visible} onClick={(event) => cancelPopup(event)} className="btn btn-light fw-bold btn-sm px-4 rounded-3" type="cancel" style={{ backgroundColor: "#ffffff" }}>Cancel</button>
                            </div>
                        </form>
                    </Popup>
                </div>
            </div>
            <div>
            { cardData.map ((card) => { return (<div className="card mb-3 mx-auto" key={card._id}>
                    <div className="row d-flex">
                        <div className="col-4">
                            <div className='colorbox ms-3 mt-3'></div>
                        </div>
                        <div className="col-8">
                            <div className="card-body ms-4">
                                <p className="card-text lh-1 p-2">{card.description}</p>
                            </div>
                        </div>
                    </div>
                    {!show ? <a onClick={(event) => seeMore(event)} className="card-text text-center clessbtn">See more</a> : null}
                    <div ref={seeMoreContainer} className='container seemorecontainer onloadhide' id="seemorecontainer">
                        <div className='d-flex justify-content-between p-2'>
                            <small>SYMBOLIZED</small>
                            <small>csd</small>
                            <small>POSITIVE</small>
                            <small>EFFECTS</small>
                        </div>
                        <div className='d-flex justify-content-between px-2'>
                            <small>SYMBOLIZED</small>
                            <small>NEGATIVE</small>
                            <small>POSITIVE</small>
                            <small>EFFECTS</small>
                        </div>
                        <div className='d-flex justify-content-between px-2'>
                            <small>SYMBOLIZED</small>
                            <small>NEGATIVE</small>
                            <small>POSITIVE</small>
                            <small>EFFECTS</small>
                        </div>
                        <div className='d-flex justify-content-between px-2'>
                            <small>SYMBOLIZED</small>
                            <small>NEGATIVE</small>
                            <small>POSITIVE</small>
                            <small>EFFECTS</small>
                        </div>
                        <div className='d-flex justify-content-between px-2'>
                            <small>SYMBOLIZED</small>
                            <small>NEGATIVE</small>
                            <small>POSITIVE</small>
                            <small>EFFECTS</small>
                        </div>
                        <div className='text-center mt-4 d-grid'>
                            <button type="button" className="btn btn-lg titleBtn">Title</button>
                        </div>
                        <div className='text-center my-2'>
                            <a onClick={(e) => seeMore(e)} className="card-text text-center clessbtn">See less</a>
                        </div>
                    </div>
                </div>)
                })}
            </div>
            {/* <div>
            <Popup visible={visible} onClose={() => setVisible(false)}>
                <p>I am a popup!</p>
            </Popup>
            </div> */}
        </div>
    )
}

export default Home;