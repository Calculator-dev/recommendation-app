import React, { useState } from 'react';
import axios from "axios";
import { Backdrop, Button, CssBaseline, Modal, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookCards from './BookCards';
import book from "../assets/book2.jpg"
import { styled } from '@mui/system';



const Root = styled("div")({
    background: `url(${book})`,
    textAlign: "center",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
})

const Filter = styled("div")({
    background: "rgba(0,0,0,0.6)",
    minHeight: "100vh",

})

const InputContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
})

const InputField = styled(TextField)({
    width: "700px",
    "& .MuiInputBase-root": {
        color: "white",
        border: "1px solid white"
    },
    '@media (max-width: 768px)': {
        width: "380px",
    },
    '@media (max-width: 600px)': {
        width: "280px",
    },
    '@media (max-width: 500px)': {
        width: "180px",
    }
})

const CardContainer = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "20px",
    margin: "auto",
    '@media (max-width: 768px)': {
        display: "grid",
        columnGap: "20px",
        margin: "auto",
        gridTemplateColumns: "1fr 1fr"
    },
    '@media (max-width: 600px)': {
        display: "grid",
        columnGap: "20px",
        margin: "auto",
        gridTemplateColumns: "1fr"
    }
})

const Card = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
})

const RecommendPopup = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})

const RecommendPopupCard = styled(Paper)({
    width: "500px",
    height: "90vh",
    position: "relative",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    textOverflow: "ellipsis",
    overflow: "scroll",
})

const TextContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItmes: "center",
})

const Text = styled(Typography)({
    fontSize: "55px",
    color: "white",
    textAlign: "left",
    height: "100px",
    display: "block",
    alignItems: "center",
    '@media (max-width: 1200px)': {
        fontSize: "35px"
    },
    '@media (max-width: 992px)': {

    }
})

export default function Book() {

    const [query, setQuery] = useState("");
    const [cards, setCards] = useState([]);
    const [recommendedButton, setRecommendedButton] = useState(false);
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            .then((response) => {
                setCards(response.data.items)
                setRecommendedButton(true);
            })
    }

    const recommendedBook = () => {
        const items = cards[Math.floor(Math.random() * cards.length)];
        setTitle(items.volumeInfo.title)
        setAuthors(items.volumeInfo.authors)
        setThumbnail(items.volumeInfo.imageLinks.thumbnail)
        setDescription(items.volumeInfo.description)
    }

    const handleCards = () => {
        const items = cards.map((book, i) => {
            let thumbnail = "";
            if (book.volumeInfo.imageLinks) {
                thumbnail = book.volumeInfo.imageLinks.thumbnail;
            }
            return (
                <div key={book.id} >
                    <BookCards
                        thumbnail={thumbnail}
                        title={book.volumeInfo.title}
                        authors={book.volumeInfo.authors}
                        description={book.volumeInfo.description}
                    />
                </div>
            );
        });
        return (
            <Card>
                <CardContainer className="card-container">
                    {items}
                </CardContainer>
            </Card>
        )
    }


    return (
        <Root>
            <Filter>
                <Typography variant="button" fontSize="40px" color="white" >Google Books</Typography>
                <InputContainer>
                    <InputField
                        size="small"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Enter book name eg. Javascipt, Animals"
                    />
                    <Button onClick={handleSubmit}>
                        <SearchIcon style={{ color: "white" }} />
                    </Button>

                    {recommendedButton && <Button className="recommend-btn" variant="contained" color="secondary" onClick={() => { recommendedBook(); handleOpen(); }}>Recommend Book</Button>}
                </InputContainer>
                <RecommendPopup
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <RecommendPopupCard>
                        <img style={{ margin: "0 auto" }} src={thumbnail} alt="slika" />
                        <h1>{title}</h1>
                        <p style={{ fontWeight: "900" }}>{authors}</p>
                        <p style={{ textAlign: "left" }}>{description}</p>
                    </RecommendPopupCard>
                </RecommendPopup>
                {!recommendedButton && <TextContainer>
                    <Text variant="button">
                        A room <span>{<br />}</span>
                        without books <span>{<br />}</span>
                        is like<span>{<br />}</span>
                        a body<span>{<br />}</span>
                        without <span>{<br />}</span>
                        a soul.<span>{<br />}</span>
                        -cicero
                    </Text>
                </TextContainer>}
                {handleCards()}
                <CssBaseline />
            </Filter>
        </Root >
    )
}
