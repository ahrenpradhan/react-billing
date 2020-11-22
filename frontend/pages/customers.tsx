import React from 'react';
import { withStyles, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Custom functions
function createData(id: string, name: string, information: object,) {
	return { id, name, information };
}

function filterCustomer(row: object, searchText: string, filter: string) {
	// id
	if (filter === 'id' || filter === 'all') {
		if (row['id'].includes(searchText)) {
			return row;
		}
	}
	// name
	if (filter === 'name' || filter === 'all') {
		if (row['name'].toLowerCase().includes(searchText)) {
			return row;
		}
	}
	// information
	if (filter === 'information' || filter === 'all') {
		if (
			row['information']['GST'].includes(searchText)
			|| row['information']['address']['line1'].toLowerCase().includes(searchText)
			|| row['information']['address']['line2'].toLowerCase().includes(searchText)
			|| row['information']['address']['line3'].toLowerCase().includes(searchText)
		) {
			return row;
		}
	}
	return false
}
// sample data
const rows = [
	createData('1', 'Google', {
		'GST': '129387912873',
		'address': {
			'line1': '1600 Amphitheatre Parkway in Mountain View',
			'line2': 'California, United States',
			'line3': '37.422°N 122.084°W'
		}
	}),
	createData('2', 'Apple', {
		'GST': '129387912873',
		'address': {
			'line1': '1600 Amphitheatre Parkway in Mountain View',
			'line2': 'California, United States',
			'line3': '37.422°N 122.084°W'
		}
	}),
];
// Custom Styles
const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		body: {
			fontSize: 14,
		},
	}),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			// '&:nth-of-type(odd)': {
			// 	backgroundColor: 'rgba(0, 0, 0, 0.01)',
			// },
		},
	}),
)(TableRow);

const useStyles1 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexShrink: 0,
			marginLeft: theme.spacing(2.5),
		},
	}),
);

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
	formControl: {
		marginLeft: 16,
		minWidth: 240,
	},

});
// Interface
interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}
// Components
function TablePaginationActions(props: TablePaginationActionsProps) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}
// Main Component
export default function CustomPaginationActionsTable() {
	const classes = useStyles2();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [selectedCustomer, setSelectedCustomer] = React.useState(null);
	const [filter, setFilter] = React.useState('all');
	const [searchText, setSearchText] = React.useState('');
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const setCustomer = (id: number) => {
		if (selectedCustomer == id) {
			setSelectedCustomer(null)
		} else {
			setSelectedCustomer(id)
		}
	}
	const handleSearchText = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
		setSearchText(event.target.value)
	}
	const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setFilter(event.target.value as string);
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="custom pagination table">
				<colgroup>
					<col style={{ width: '10%' }} />
					<col style={{ width: '10%' }} />
					<col style={{ width: '30%' }} />
					<col style={{ width: '50%' }} />
				</colgroup>
				<TableHead>
					<TableRow>
						<StyledTableCell>Sr. No.</StyledTableCell>
						<StyledTableCell>ID</StyledTableCell>
						<StyledTableCell>Customer/Company&nbsp;Name</StyledTableCell>
						<StyledTableCell>Information</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
					).filter(row => row['id'] != '0').filter(row => filterCustomer(row, searchText.toLowerCase(), filter)).map((row, index) => (
						<StyledTableRow key={row.id} hover={true} selected={selectedCustomer == row.id} onClick={() => setCustomer(row['id'])}>
							<StyledTableCell >{index + 1}.</StyledTableCell>
							<StyledTableCell component="th" scope="row">
								{row.id}
							</StyledTableCell>
							<StyledTableCell >{row.name}</StyledTableCell>
							<StyledTableCell>
								<Grid container>
									<Grid item xs='8'>
										{
											selectedCustomer == row.id && (
												<>
													GST : {row.information.GST}
													<Divider />
												</>
											)
										}
										<span style={{ fontWeight: 700 }}>
											Address :
										</span>
										<div style={{
											paddingLeft: '8px'
										}}>
											{row.information.address.line1},<br />{row.information.address.line2},<br />
											{row.information.address.line3}
										</div>
										{
											selectedCustomer == row.id && (
												<>
													<Divider />
													<span style={{ fontWeight: 700 }}>
														Order Details:
													</span>
													<div style={{
														paddingLeft: '8px'
													}}>
														Orders Pending : _sample_data_<br />
														Total Orders : _sample_data_
													</div>
												</>
											)
										}
									</Grid>
									<Grid item xs='4'>
										{
											selectedCustomer == row.id && (
												<>
													{/* <Button variant="contained" fullWidth color="primary">Edit</Button> */}
													{/* <Button variant="contained" fullWidth color="secondary">Delete</Button> */}
													<Button><EditIcon /></Button>
												</>
											)
										}
									</Grid>
								</Grid>
							</StyledTableCell>
						</StyledTableRow>
					))}
					{emptyRows > 0 && (
						<StyledTableRow style={{ height: 53 * emptyRows }}>
							<StyledTableCell colSpan={4} />
						</StyledTableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan='4' >
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<TextField id="outlined-basic" label="Search" variant="outlined" fullWidth onChange={handleSearchText} />
								<FormControl className={classes.formControl}>
									<InputLabel id="demo-simple-select-label">Filter</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={filter}
										onChange={handleFilterChange}
									>
										<MenuItem value={'id'}>ID</MenuItem>
										<MenuItem value={'name'}>Customer/Company&nbsp;Name</MenuItem>
										<MenuItem value={'information'}>Information</MenuItem>
										<MenuItem value={'all'}>all</MenuItem>
									</Select>
								</FormControl>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							// colSpan={3}
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
			{
				searchText && (
					<div>
						Search result: {rows.length}
					</div>

				)
			}
		</TableContainer>

	);
}
