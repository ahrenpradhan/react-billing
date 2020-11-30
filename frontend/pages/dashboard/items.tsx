import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://material-ui.com/'>
                Your Website
			</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
    textField: {
        marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '90%',
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5];

export default function Album() {
    const classes = useStyles();
    const [view, setView] = React.useState('card');
    const [edit, setEdit] = React.useState(null);
    const [addItem, setAddItem] = React.useState(false);

    const handleView = (view: string) => {
        setView(view);
    };
    const handleEdit = (id: string) => {
        id ? setEdit(id) : setEdit(null);
    };
    const handleAddItem = () => {
        setAddItem(!addItem)
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth='sm'>
                        <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
                            My Warehouse
						</Typography>
                        <Typography variant='h5' align='center' color='textSecondary' paragraph>
                            Create new , edit and delete existing items
						</Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify='center'>
                                <Grid item>
                                    <Button
                                        variant={view == 'card' ? 'contained' : 'outlined'}
                                        color='primary'
                                        onClick={handleView.bind(this, 'card')}>
                                        Card View
									</Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant={view == 'list' ? 'contained' : 'outlined'}
                                        color='primary'
                                        onClick={handleView.bind(this, 'list')}>
                                        List View
									</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                {view == 'card' && (
                    <Container className={classes.cardGrid} maxWidth='md'>
                        <Grid container spacing={4}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card className={classes.card} variant='outlined' style={{height:'auto'}}>
                                        {
                                            edit != card ? (
                                                <>
                                                    <CardHeader
                                                        title={<>Item Name</>}
                                                        subheader={new Date().toLocaleDateString()}
                                                    />
                                                    <CardMedia
                                                        className={classes.cardMedia}
                                                        image='https://picsum.photos/200/300'
                                                        title='Image title'
                                                    />
                                                    <CardContent className={classes.cardContent}>
                                                        <Typography>This is some sample item description</Typography>
                                                    </CardContent>
                                                </>
                                            ) : (
                                                    <>
                                                        <CardHeader
                                                            title={<TextField className={classes.textField} id="outlined-basic" label="Item Name" />}
                                                            subheader={
                                                                <TextField
                                                                    id="date"
                                                                    label="Birthday"
                                                                    type="date"
                                                                    defaultValue="2017-05-24"
                                                                    className={classes.textField}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            }
                                                        />
                                                        {/* <CardMedia
                                                        className={classes.cardMedia}
                                                        image='https://picsum.photos/200/300'
                                                        title='Image title'
                                                    /> */}
                                                        <CardContent className={classes.cardContent}>
                                                            <TextField
                                                                className={classes.textField}
                                                                id="standard-multiline-static"
                                                                label="Item Description"
                                                                multiline
                                                                rows={4}
                                                                defaultValue="sample item description"
                                                            />
                                                            <TextField className={classes.textField} id="outlined-basic" label="Price" />
                                                            <br />
                                                            <br />
                                                            <Divider />
                                                            <TextField className={classes.textField} id="outlined-basic" label="Product ID" />
                                                            <TextField className={classes.textField} id="outlined-basic" label="Image Source" />
                                                        </CardContent>
                                                    </>
                                                )
                                        }
                                        {/* {(edit == card || !edit) && ( */}
                                        <CardActions>
                                            {edit != card ? (
                                                <Button
                                                    size='small'
                                                    color='primary'
                                                    onClick={handleEdit.bind(this, card)}
                                                    disabled={edit || addItem}
                                                >
                                                    Edit
                                                </Button>
                                            ) : (
                                                    <>
                                                        <Button
                                                            size='small'
                                                            color='secondary'
                                                            onClick={handleEdit.bind(this, null)}
                                                        >
                                                            Close
														</Button>
                                                        <Button
                                                            variant='contained'
                                                            size='small'
                                                            color='primary'
                                                            onClick={handleEdit.bind(this, null)}
                                                        >
                                                            Update
														</Button>
                                                    </>
                                                )}
                                        </CardActions>
                                        {/* )} */}
                                    </Card>
                                </Grid>
                            ))}
                            {
                                !edit &&
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card className={classes.card} style={{}}>
                                        {
                                            !addItem ? (
                                                <CardContent className={classes.cardContent} style={{ alignSelf: 'center' }}>
                                                    <IconButton onClick={handleAddItem}
                                                        style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                                                        <AddIcon style={{ fontSize: 100 }} />
                                                    </IconButton>
                                                </CardContent>
                                            ) : (
                                                    <>
                                                        <CardHeader
                                                            title={<TextField className={classes.textField} id="outlined-basic" label="Item Name" />}
                                                            subheader={
                                                                <TextField
                                                                    id="date"
                                                                    label="Birthday"
                                                                    type="date"
                                                                    defaultValue="2017-05-24"
                                                                    className={classes.textField}
                                                                    InputLabelProps={{ shrink: true }}
                                                                />
                                                            }
                                                        />
                                                        {/* <CardMedia
                                                        className={classes.cardMedia}
                                                        image='https://picsum.photos/200/300'
                                                        title='Image title'
                                                    /> */}
                                                        <CardContent className={classes.cardContent}>
                                                            <TextField
                                                                className={classes.textField}
                                                                id="standard-multiline-static"
                                                                label="Item Description"
                                                                multiline
                                                                rows={4}
                                                                defaultValue="sample item description"
                                                            />
                                                            <TextField className={classes.textField} id="outlined-basic" label="Price" />
                                                            <br />
                                                            <br />
                                                            <Divider />
                                                            <TextField className={classes.textField} id="outlined-basic" label="Product ID" />
                                                            <TextField className={classes.textField} id="outlined-basic" label="Image Source" />
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button
                                                                onClick={handleAddItem}
                                                                size='small'
                                                                color='secondary'
                                                            >
                                                                Discard
                                                        </Button>
                                                            <Button
                                                                onClick={handleAddItem}
                                                                variant='contained'
                                                                size='small'
                                                                color='primary'
                                                            >
                                                                Add
                                                        </Button>
                                                        </CardActions>
                                                    </>
                                                )
                                        }
                                    </Card>
                                </Grid>
                            }
                        </Grid>
                    </Container>
                )}
                {view == 'list' && (
                    <Container className={classes.cardGrid} maxWidth='md'>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Cost</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cards.map((card) => (
                                        <TableRow>
                                            <TableCell>sample name</TableCell>
                                            <TableCell>100000.00</TableCell>
                                            <TableCell>{new Date().toISOString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                )}
            </main>
        </React.Fragment>
    );
}
