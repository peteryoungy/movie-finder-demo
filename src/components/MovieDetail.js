import React, { useEffect, useState } from "react";
import { Row, Col, Image, Rate, Tag} from "antd";
import { useParams } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";

function MovieDetail(props) {
    const { movie_id } = useParams();
    // console.log('movie_id', movie_id)

    // const locationPermissionState = useState(null)

    // todo: defaut state
    let latitude = 40.7938512;
    let longitude = -73.9729093;

    useEffect(() => {
        // if ("geolocation" in navigator) {
        //     console.log("Available");
        //     const permissionStatus = await navigator?.permissions?.query({name: 'geolocation'})
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         latitude = position.coords.latitude;
        //         longitude = position.coords.longitude;
        //         console.log("Latitude is :", position.coords.latitude);
        //         console.log("Longitude is :", position.coords.longitude);
        //     });
        // } else {
        //     console.log("Not Available");
        // }

        // note: 1. get geolocation
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        console.log(result.state);
                        //If granted then you can directly call your function here
                        navigator.geolocation.getCurrentPosition(function (
                            position
                        ) {
                            latitude = position.coords.latitude;
                            longitude = position.coords.longitude;
                            console.log(
                                "Latitude is :",
                                position.coords.latitude
                            );
                            console.log(
                                "Longitude is :",
                                position.coords.longitude
                            );
                        });
                    } else if (result.state === "prompt") {
                        console.log(result.state);
                    } else if (result.state === "denied") {
                        //todo: If denied then you have to show instructions to enable location
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }

        // note: 2. Register Card Events

        const cards = document.getElementsByClassName('detail-list-card')

        for(let i = 0; i < cards.length; i++){

            cards[i].addEventListener('mouseenter', responseCardEnter)
            cards[i].addEventListener('mouseleave', responseCardLeave)
            cards[i].addEventListener('mousedown', responseCardDown, true)
            cards[i].addEventListener('mouseup', responseCardUp, true)
            cards[i].addEventListener('click', responseCardClick, true)
        }

        return () => {
            const cards = document.getElementsByClassName('detail-list-card')

            for(let i = 0; i < cards.length; i++){
    
                cards[i].removeEventListener('mouseenter', responseCardEnter)
                cards[i].removeEventListener('mouseleave', responseCardLeave)
                cards[i].removeEventListener('mousedown', responseCardDown, true)
                cards[i].removeEventListener('mouseup', responseCardUp, true)
                cards[i].removeEventListener('click', responseCardClick, true)
            }
        }
    }, []);

    const responseCardEnter = (e) => {

        console.log('target', e.target)
        e.target.classList.add('primary-hover')
    }

    const responseCardLeave = (e) => {

        console.log('target', e.target)
        e.target.classList.remove('primary-hover')
        e.target.classList.remove('primary-active')
    }

    const responseCardDown = (e) => {
        const parent = e.target.closest('.detail-list-card');
        console.log('parent', parent)

        parent.classList.add('primary-active')
        e.stopPropagation()
    }

    const responseCardUp = (e) => {

        const parent = e.target.closest('.detail-list-card');
        console.log('parent', parent)

        parent.classList.remove('primary-active')
        e.stopPropagation()
    }

    const responseCardClick = (e) => {

        console.log('event', e)
        // console.log('target', e.target)

        const parent = e.target.closest('.detail-list-card');
        console.log('parent', parent)

        let cinema_id = parent.getAttribute('data-id')
        console.log('cinema_id', cinema_id)
        window.location.href = '/cinema/' + cinema_id
    }

    const response = {
        body: {
            movieId: "1",
            movieName: "movie_name_1",
            movieImage: "https://picsum.photos/200/300",
            releaseDate: "2022-04-13",
            rating: "4.5",
            synopsis:
                "Set in Middle-earth, the story tells of the Dark Lord Sauron, who seeks the One Ring, which contains part of his soul, in order to return to power. The Ring has found its way to the young hobbit Frodo Baggins. The fate of Middle-earth hangs in the balance as Frodo and eight companions begin their journey to Mount Doom in the land of Mordor, the only place where the Ring can be destroyed.",
            duration: "90",
            genres: ["genres1", "genres2", "genres3"],
            directors: ["director1", "director2", "director3"],
            cast: ["cast1", "cast2", "cast3"],
            cinemas: [
                {
                    inemaId: "1",
                    cinemaName: "AMC 84th Street 6",
                    distance: "0.7",
                    address: "2310 Broadway, New York, NY 10024",
                },
                {
                    inemaId: "2",
                    cinemaName: "Regal E-Walk 4DX & RPX",
                    distance: "0.8",
                    address: "247 W 42nd St, New York, NY 10036",
                },
                {
                    inemaId: "3",
                    cinemaName: "AMC Lincoln Square 13",
                    distance: "0.8",
                    address: "1998 Broadway, New York, NY 10023",
                },
            ],
        },
    };

    const displayCinemaList = response.body.cinemas.map((cinema) => (
        <div className="pointer detail-list-card" key={cinema["inemaId"]} data-id={cinema.inemaId}>
            <Row className="padding-left">
                <Col span={20}>
                    <span className="bold-600"> {cinema.cinemaName}</span>
                </Col>

                <Col>
                    <EnvironmentOutlined />
                    <span className="detail-default">
                        {" "}
                        {cinema.distance} miles
                    </span>
                </Col>
            </Row>
            <Row className="padding-left">
                <Col>
                    <span className="detail-small detail-sub-title"> {cinema.address} </span>
                </Col>
            </Row>
        </div>
    ));
    return (
        <div className="bg-1">
            <br />
            <div className="detail-div">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                        <img
                            src={response.body.movieImage}
                            className="detail detail-img"
                        />
                    </Col>

                    <Col span={14}>
                        <div>

                            <div className="detail detail-title">
                                <span className="span-padding-right-10"> {response.body.movieName}</span>
                                <Tag color={"lime"} className='detail'> Movie </Tag>
                            </div>

                            <div className="detail detail-sub-title">
                                <div>
                                    {response.body.releaseDate} ·{" "}
                                    {response.body.genres.join("/")} ·{" "}
                                    {response.body.duration} mins
                                </div>

                                <div className="rate">
                                    <Rate disabled defaultValue={2} />
                                </div>
                            </div>

                            <div className="detail detail-default">
                                {response.body.synopsis}
                            </div>

                            <div className="detail detail-default">
                                <div>
                                    <span>Directors </span>
                                    <span className="blue">
                                        {response.body.directors.join(" ")}
                                    </span>
                                </div>
                                <div>
                                    <span>Cast </span>
                                    <span className="blue">
                                        {response.body.cast.join(" ")}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-cinema-list">
                                {displayCinemaList}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default MovieDetail;
