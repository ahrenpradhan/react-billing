import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, Divider, Grid, makeStyles, Paper, Tabs, TextField, Theme } from '@material-ui/core';
import Tab from '@material-ui/core/Tab/Tab';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiTextField-root': {
				marginBottom: theme.spacing(2),
				// width: '25ch',
			},
		},
	}),
);


export default function AddContact({
	addContactToggle,
	handleAddContactToggle,
	handleCustomerArray
}) {
	const classes = useStyles();

	const [value, setValue] = React.useState(0);
	const [data, setData] = React.useState({
		'id':'12332',
		'name': '',
		'information': {
			'GST': '',
			'address': {
				'line1': '',
				'line2': '',
				'line3': ''
			}
		}
	});

	const handleUpdateDate = (action: string, event: React.ChangeEvent<HTMLInputElement>) => {
		switch (action) {
			case 'name':
				setData({ ...data, 'name': event.target.value });
				break;
			case 'gst':
				setData({ ...data, 'information': { ...data['information'], 'GST': event.target.value } });
				break;
			case 'line1':
				setData({
					...data,
					'information': {
						...data['information'],
						'address': {
							...data['information']['address'],
							'line1': event.target.value
						}
					}
				});
				break;
			case 'line2':
				setData({
					...data,
					'information': {
						...data['information'],
						'address': {
							...data['information']['address'],
							'line2': event.target.value
						}
					}
				});
				break;
			case 'line3':
				setData({
					...data,
					'information': {
						...data['information'],
						'address': {
							...data['information']['address'],
							'line3': event.target.value
						}
					}
				});
				break;
			case 'phone':
				return null;
				break;
			case 'enail':
				return null;
			default:
				alert('no action detected');
		}
		
		return null;
	}

	const handleClose = () => {
		handleAddContactToggle();
	};

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleSave = () => {
		handleCustomerArray('add',{data})
		handleClose();
	}

	return (
		<div>
			<Dialog
				open={addContactToggle}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle id='alert-dialog-slide-title' style={{
					borderBottom: '2px solid #3f51c6',
					margin: '0 24px',
					paddingLeft: 0,
					paddingBottom: 0,
				}}>
					{/* {"Use Google's location service?"} */}
					Add Contact Form
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<h4 style={{
							marginTop: 4
						}}>
							Please select the appropriate tab in order to add new contacts.<br />
							You may either add contacts individually but it's recommended to import a set of contacts in case you are planing to do so.<br />
						</h4>
						<h5 style={{
							paddingLeft: 12,
							borderLeft: '1px solid black'
						}}>
							Note- <i>for experienced users</i><br />
							Each contact ID is generated automatically but you can edit it later when required
						</h5>
					</DialogContentText>
					<Divider />
					<Paper square>
						<Tabs
							value={value}
							indicatorColor='primary'
							textColor='primary'
							onChange={handleChange}
							aria-label='disabled tabs example'>
							<Tab label='Single Contact' />
							<Tab label='Import Multiple Contacts' />
						</Tabs>
					</Paper>
					<div style={{ paddingTop: 16 }}>
						{value == 0 ? (
							<form className={classes.root} noValidate autoComplete="off">
								<Grid container>
									<Grid item xs={12}>
										<TextField
											id="outlined-basic-name"
											label="Customer / Company Name"
											value={data.name}
											onChange={handleUpdateDate.bind(this, 'name')}
											variant="outlined"
											fullWidth
											required
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="outlined-basic-GST"
											label="GSTIN number"
											value={data['information']['GST']}
											onChange={handleUpdateDate.bind(this, 'gst')}
											variant="outlined"
											fullWidth
											required
										/>
									</Grid>
									<Grid item xs={2}>
										Address
										</Grid>
									<Grid item xs={10}>
										<Grid item xs={12}>
											<TextField
												id="outlined-basic-Address1"
												label="Line 1"
												value={data['information']['address']['line1']}
											onChange={handleUpdateDate.bind(this, 'line1')}
												variant="outlined"
												fullWidth
												required
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												id="outlined-basic-Address2"
												label="Line 2"
												value={data['information']['address']['line2']}
											onChange={handleUpdateDate.bind(this, 'line2')}
												variant="outlined"
												fullWidth
												required
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												id="outlined-basic-Address3"
												label="Line 3"
												value={data['information']['address']['line3']}
											onChange={handleUpdateDate.bind(this, 'line3')}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="outlined-basic-PhoneNumber"
											label="Phone number"
											variant="outlined"
											fullWidth
											required />
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="outlined-basic-Email"
											label="Email"
											variant="outlined"
											fullWidth
											required
										/>
									</Grid>
								</Grid>
							</form>
						) : <div>view two</div>}
					</div>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="secondary">
						Discard
					</Button>
					<Button onClick={handleSave} variant="contained" color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
