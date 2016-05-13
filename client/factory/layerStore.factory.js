app.factory('LayerStore', function(esriLoader) {

            return {

            	layers: [
		{
		 	name: 'Sewer Districts',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/9',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",	
		  	options: {
		  		id:"Districts",
		  		outFields: ['OBJECTID', 'SdLocality', 'SDShortName', 'dSdLifeCycleStatus', 'SdLongName'],
		  		infoTemplate: {
		  			title: '<b>Sewer Districts Info</b>',
		  			content: 'Locality: ${SdLocality}<br>Long Name: ${SdLongName}<br>Short Name: ${SDShortName}<br>Life Cycle Status: ${dSdLifeCycleStatus}'
		  		}
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'Sewer Contract Outlines',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	//'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	visible: true,
			renderOptions: [],
			currentRender: "",
		  	options: {
		  		id:"Outlines",
		  		outFields: ['OBJECTID', 'ContractNumber', 'ContractNumberAlt'],
		  		infoTemplate: {
		  			title: '<b>Sewer Contract Outlines</b>',
		  			content: 'Contract Number: ${ContractNumber}<br> Alt Contract Number: ${ContractNumberAlt}'
		  		}
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		},
		 },
		  {
		 	name: 'Manholes',
		 	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/0',
		 	visible: true,
		 	renderOptions: [{label:"Investigation Status", id:'investigationStatus'},{label: "Horizontal Quality", id:'horizontalQuality'},{label: "Vertical Quality", id: 'verticalQuality'}],
		 	currentRender: "horizontalQuality",
		 	options: {
		 		id:"Manholes",
		 		outFields: ['OBJECTID','HansenMatchStatus','MhYearBuilt', 'dMhLifeCycleStatus', 
		 		'LastFieldSurveyDate', 'FlushCount', 'CoverLocationDate', 'MhRimElevRecord', 'MhRimElevNAVD88',
		 		'MHsubType','MhContractNumber','dCountyResponsible','MhContractName', 'UnitID',
		 		 "FkMhHorizontalQuality", 'FkMhVerticalQuality', 'InvestigationStatus'],
		 		infoTemplate: {
		  			title: '<b>Manholes</b>',
		  			content: 'Contract Number: ${MhContractNumber}<br>Contract Name: ${MhContractName}<br>Hansen Unit ID: ${UnitID}<br>'+
                             'County Responsible?: ${dCountyResponsible}<br> Hansen Match Status: ${HansenMatchStatus }<br>' +
                             'Manhole Type: ${MHsubType}<br> Rim Elevation Record: ${MhRimElevRecord}<br> Rim Elevation NAVD88: ${MhRimElevNAVD88}<br>' + 
                             'Flush Count: ${FlushCount}<br> Horizontal Quality: ${FkMhHorizontalQuality}<br> Vertical Quality: ${FkMhVerticalQuality}<br>' +
                             'Cover Location: ${CoverLocationDate}<br> Last Field Survey: ${LastFieldSurveyDate}<br> Life Cycle Status: ${dMhLifeCycleStatus}<br> Year Built: ${MhYearBuilt}'
		  		}
		 	},
		 	style: {
	  			type: "point",
	  			tblField: []
	  		}
		 },
		 
		 {
		 	name: 'Sewer Mains',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/2',
		  	visible: true,
		  	renderOptions: [{label: "Pipe Sub Type", id:'PipeSubType'}],
		  	currentRender: "PipeSubType",
		  	options: {
		  		id:"Mains",
		  		outFields: ['OBJECTID', 'FkPipeSewerDistrict', 'YearBuilt', 'PipeSubType', 'FkPipeContractID', 'PipeContractNumber', 'PipeContractName',
		  		'dCountyResponsible', 'dPipeDiameterRecord', 'dPipeMaterialRecord', 'dPipeClassRecord', 'LengthRecord', 'SlopeRecord',
		  		 'InvertUpRecord', 'InvertDownRecord', 'InvertUpNAVD1988', 'InvertDownNAVD1988', 'dPipeLifeCycleStatus'],
		  		infoTemplate: {
		  			title: '<b>Sewer Mains</b>',
		  			content: ' Contract ID:${FkPipeContractID}<br> Contract Number: ${PipeContractNumber}<br>'+
		  			'Contract Name: ${PipeContractName}<br>County Responsible?: ${dCountyResponsible}<br> Diameter: ${dPipeDiameterRecord}<br>' +   
                    'Material: ${dPipeMaterialRecord}<br>Pipe Class: ${dPipeClassRecord}<br>Record Length: ${LengthRecord}<br>'+  
                    'Slope Record: ${SlopeRecord}<br>Pipe Type: ${PipeSubType}<br>Upstream Invert: ${InvertUpRecord}<br>' +
                    'Downstream Invert: ${InvertDownRecord}<br> Upstream Invert - 1988 Datum: ${InvertUpNAVD1988}<br>' +  
                    'Downstream Invert - 1988 Datum: ${InvertDownNAVD1988}<br>Life Cycle Status: ${dPipeLifeCycleStatus}<br> Year Built: ${YearBuilt}'
		  			
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
		 },
		 {
		 	name: 'Sewer Interceptors',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/1',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "interceptorDefault",
		  	options: {
		  		id:"Interceptors",
		  		showLabels: false,
		  		outFields: ['OBJECTID', 'InterceptorName'],
		  		infoTemplate: {
		  			title: '<b>Sewer Interceptors</b>',
		  			content: 'Interceptor Name: ${InterceptorName}'
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Main Casings',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/3',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Castings",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Main Casings</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Easements',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/4',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Easements",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Easements</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Pump Stations',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/5',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Stations",
		  		outFields: ['FkPsContractID','ProjectName','dPsSewerDistrict', 'PsLocation', 'FkParcelID','dLifeCycleStatus', 'StructureDescription','dCountyResponsible', 'PsManufacturer',
		  						'FkPsType', 'PsNumberOfUnits','PsUnitIDnumbers', 'CapacityGPM', 'TotalHeadFeet', 'MotorHP', 'MotorRPM', 'MotorElectric' ],    
		  		infoTemplate: {
		  			title: '<b>Sewer Pump Stations</b>',
		  			content: 'Contract Number: ${FkPsContractID}<br> Contract Name: ${ProjectName}<br>Sewer District: ${dPsSewerDistrict}<br>Location: ${PsLocation}<br>Tax Parcel ID: ${FkParcelID}<br>' +
		  			'Life Cycle Status: ${dLifeCycleStatus}<br>Structure Description: ${StructureDescription}<br>County Responsible: ${dCountyResponsible}<br>Manufacturer: ${PsManufacturer}<br>' +
		  			'Type: ${FkPsType}<br>Number of Units: ${PsNumberOfUnits}<br>Unit ID Numbers: ${PsUnitIDnumbers}<br>Capacity (GPM): ${CapacityGPM}<br>Total Head (Ft.): ${TotalHeadFeet}<br>' +
		  			'Motor Electric: ${MotorElectric}<br>Motor RPM: ${MotorRPM}<br>Motor Horsepower: ${MotorHP}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Treatment Plants',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/6',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Plants",
		  		outFields: ['StpName','StpAddress', 'FkStpOwner','dStpSewerDistrict', 'SpdesPermitNumber', 'dCountyResponsible',
		  					'dStpProcess', 'StpFlowDesignMGD', 'StpFlowPermittedMGD', 'StpFlowAnnualAverageMGD', 'StpFlowOverflowCapacityMGD',
		  					  'StpFlowAnnualAverageMGD', 'StpFlowOverflowCapacityMGD', 'dStpDischargeMethod', 'dLifeCycleStatus', 'StpRemarks'],
		  		infoTemplate: {
		  			title: '<b>Sewer Treatment Plants</b>',
		  			content: 'Plant Name: ${StpName}<br> Location: ${StpAddress}<br> Hamlet: ${StpHamletAddress}<br>Owner: ${FkStpOwner}'+ 
                    'District: ${dStpSewerDistrict}<br>SPDES Permit #: ${SpdesPermitNumber}<br>County Responsible? ${dCountyResponsible} <br>'+
                    'Process ${dStpProcess}<br>Design Flow(MGD): ${StpFlowDesignMGD}<br>Permitted Flow (MGD): ${StpFlowPermittedMGD}<br>' + 
                    'Annual Average Flow (MGD): ${StpFlowAnnualAverageMGD} <br>Overflow Capacity (MGD): ${StpFlowOverflowCapacityMGD} <br>' +
                    'Discharge Method: ${dStpDischargeMethod} <br>Life Cycle Status: ${dLifeCycleStatus} <br>Remarks: ${StpRemarks}'
		  		} 
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Sheet Outlines',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/7',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"SheetOutlines",
		  		outFields: ['OBJECTID', 'ContractNumber', 'ContractName', 'SheetNumA', 'SheetDescription', 'dDocumentType', 'WebRelativeImagePath'],
		  		infoTemplate: {
		  			title: '<b>Sewer Sheet Outlines</b>',
		  			content: 'Contract Number: ${ContractNumber}<br>Contract Name: ${ContractName}<br>Sheet Number: ${SheetNumA}<br>Sheet Description: ${SheetDescription}<br> Document Type: ${dDocumentType}<br>Path: <a href=${WebRelativeImagePath}>${WebRelativeImagePath}</a>'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Problems',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/10',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Problems",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Problems</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Contractee Parcels',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/11',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"ContracteeParcels",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Contractee Parcels</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'House Connection Permits',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/12',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"ConnectionPermits",
		  		outFields: ['OBJECTID', 'TaxParcelID', 'PermitNumber', 'Comments', 'WebRelativeImagePath'],
		  		infoTemplate: {
		  			title: '<b>House Connection Permits</b>',
		  			content: 'Tax Parcel ID: ${TaxParcelID}<br>Permit Number: ${PermitNumber}<br>Comments: ${Comments}<br>Path: <a href=${WebRelativeImagePath}>${WebRelativeImagePath}</a><br>'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Sewer Aerial Photo Centers',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/15',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"PhotoCenters",
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Aerial Photo Centers</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "point",
	  			tblField: []
	  		}
	  	},
	  	{
		 	name: 'Possible Easement Parcels',
		  	url: 'https://portal.gayrondebruin.com/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/17',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"EasementParcels",
		  		outFields: ['PARCELID', 'LAST_NAME', 'STREET', 'CITY', "MAIL_ZIP", "OWNER_NAME"],
		  		infoTemplate: {
		  			title: '<b>Possible Easement Parcels</b>',
		  			content: 'Tax Map: ${PARCELID} <br> Last Name: ${LAST_NAME} <br> Street: ${STREET}<br> City: ${CITY}<br> Mail Zip: ${MAIL_ZIP}<br> Owner Name: ${OWNER_NAME}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		}
	  	},	
	 ]
    }
})