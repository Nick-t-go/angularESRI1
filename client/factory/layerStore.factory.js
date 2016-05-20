app.factory('LayerStore', function(esriLoader) {

            return {

            	layers: [
		{
		 	name: 'Sewer Districts',
		  	url: rootPathOptions[activeLocation]+'9',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "",	
		  	options: {
		  		id:"Districts",
		  		visible: true,
		  		outFields: ['OBJECTID', 'SdLocality', 'SDShortName', 'dSdLifeCycleStatus', 'SdLongName'],
		  		infoTemplate: {
		  			title: '<b>Sewer Districts Info</b>',
		  			content: 'Locality: ${SdLocality}<br>Long Name: ${SdLongName}<br>Short Name: ${SDShortName}<br>Life Cycle Status: ${dSdLifeCycleStatus}'
		  		}
		  	},
		  	style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: [
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "{SDShortName} {SdLongName}"},
	  				labelPlacement: "always-horizontal",
	  				minScale:36111.0, 
	  				maxScale: 9027.977411
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [168, 0, 132, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "center",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Arial",
				      "size": 14,
				      "style": "normal",
				      "weight": "normal",
				      "decoration": "none"
					}
	  			}

	  		},
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "{SDShortName}"},
	  				labelPlacement: "always-horizontal",
	  				minScale:288894.0 , 
	  				maxScale: 36111.909643
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [168, 0, 132, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "center",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Arial",
				      "size": 14,
				      "style": "normal",
				      "weight": "normal",
				      "decoration": "none"
					}
	  			}

	  		},

	  		]
		 },
		 {
		 	name: 'Sewer Contract Outlines',
		  	url: rootPathOptions[activeLocation]+'8',
		  	//'https://fs-gdb10:6443/arcgis/rest/services/SuffolkCounty/SCSewers/MapServer/8',
		  	visible: true,
			renderOptions: [],
			currentRender: "",
		  	options: {
		  		id:"Outlines",
		  		visible: true,
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
	  		labels: []
		 },
		  {
		 	name: 'Manholes',
		 	url: rootPathOptions[activeLocation]+'0',
		 	visible: true,
		 	renderOptions: [{label:"Investigation Status", id:'investigationStatus'},{label: "Horizontal Quality", id:'horizontalQuality'},{label: "Vertical Quality", id: 'verticalQuality'}],
		 	currentRender: "horizontalQuality",
		 	specialOutfields: ['UnitID', 'dMhLifeCycleStatus', 'MhRimElevRecord', 'MhContractNumber', "FkMhHorizontalQuality"],
		 	options: {
		 		id:"Manholes",
		 		visible: true,
		 		outFields: ['UnitID','HansenMatchStatus','MhYearBuilt', 'dMhLifeCycleStatus', 
					 		'LastFieldSurveyDate', 'FlushCount', 'CoverLocationDate', 'MhRimElevRecord', 'MhRimElevNAVD88',
					 		'MHsubType','MhContractNumber','dCountyResponsible','MhContractName', 
					 		 "FkMhHorizontalQuality", 'FkMhVerticalQuality', 'InvestigationStatus'],
		 		infoTemplate: {
		  			title:   '<b>Manholes</b>',
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
	  		},
	  		labels: [
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "R = {MhRimElevRecord}"},
	  				labelPlacement: "center-right",
	  				minScale:4513.988705 
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [0, 0, 0, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "center ",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Calibri ",
				      "size": 10,
				      "style": "italic ",
				      "weight": "normal",
				      "decoration": "none"
					}
	  			},
	  			where: ""
	  		},
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "R = {MhRimElevNAVD88} (88)"},
	  				labelPlacement: "below-right",
	  				minScale:4513.988705 
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [0, 0, 0, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "center ",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Calibri ",
				      "size": 10,
				      "style": "italic ",
				      "weight": "normal",
				      "decoration": "none"
					},
	  			},
	  			where: ""
	  			
	  		},
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "#{UnitID}"},
	  				labelPlacement: "above-right",
	  				minScale:4513.988705 
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [0, 0, 0, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "center ",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Calibri ",
				      "size": 10,
				      "style": "italic ",
				      "weight": "normal",
				      "decoration": "none"
					}
	  			},
	  			where: ""
	  		}

	  		]
		 },
		 
		 {
		 	name: 'Sewer Mains',
		  	url: rootPathOptions[activeLocation]+'2',
		  	visible: true,
		  	renderOptions: [{label: "Pipe Sub Type", id:'PipeSubType'}],
		  	currentRender: "PipeSubType",
		  	specialOutfields: ['OBJECTID', 'LengthRecord', 'SlopeRecord','InvertUpRecord', 'InvertDownRecord'],
		  	options: {
		  		id:"Mains",
		  		visible: true,
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
	  		},
	  		labels: [
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "{dPipeDiameterRecord} {LengthRecord}"},
	  				labelPlacement: "above-along",
	  				minScale:4513.988705 
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [38, 115, 0, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "left ",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Calibri ",
				      "size": 12,
				      "style": "normal ",
				      "weight": "bold",
				      "decoration": "none"
					}
	  			}

	  		}
	  		]
		 },
		 {
		 	name: 'Sewer Interceptors',
		  	url: rootPathOptions[activeLocation]+'1',
		  	visible: true,
		  	renderOptions: [],
		  	currentRender: "interceptorDefault",
		  	options: {
		  		id:"Interceptors",
		  		visible: true,
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
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Sewer Main Casings',
		  	url: rootPathOptions[activeLocation]+'3',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Castings",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Main Casings</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polyline",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Sewer Easements',
		  	url: rootPathOptions[activeLocation]+'4',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Easements",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Easements</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Sewer Pump Stations',
		  	url: rootPathOptions[activeLocation]+'5',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	specialOutfields: ['FkPsContractID','ProjectName','dPsSewerDistrict', 'PsLocation', 'FkParcelID'],
		  	options: {
		  		id:"Stations",
		  		visible: false,
		  		displayOnPan: false,
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
	  			tblField: [
	  			]
	  		},
	  		labels: [
	  		{
	  			labelInfo: 
	  			{
	  				labelExpressionInfo: {"value": "PS{PsName}"},
	  				labelPlacement: "always-horizontal"
	  			},
	  			textInfo: {
	  				 "type": "esriTS",
				     "color": [0, 0, 0, 255],
				     "verticalAlignment": "bottom",
				     "horizontalAlignment": "center ",
				     "rightToLeft": false,
				     "angle": 0,
				     "xoffset": 0,
				     "yoffset": 0,
				     "font": {
				      "family": "Arial",
				      "size": 8,
				      "style": "normal ",
				      "weight": "normal",
				      "decoration": "none"
					}
	  			},
	  			where: ""

	  		}]
	  	},
	  	{
		 	name: 'Sewer Treatment Plants',
		  	url: rootPathOptions[activeLocation]+'6',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	specialOutfields: ['StpName','StpAddress', 'FkStpOwner','dStpSewerDistrict', 'SpdesPermitNumber'],
		  	options: {
		  		id:"Plants",
		  		visible: false,
		  		displayOnPan: false,
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
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Sewer Sheet Outlines',
		  	url: rootPathOptions[activeLocation]+'7',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	specialOutfields: ['OBJECTID', 'ContractNumber', 'ContractName', 'WebRelativeImagePath'],
		  	options: {
		  		id:"SheetOutlines",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID', 'ContractNumber', 'ContractName', 'SheetNumA', 'SheetDescription', 'dDocumentType', 'WebRelativeImagePath'],
		  		infoTemplate: {
		  			title: '<b>Sewer Sheet Outlines</b>',
		  			content: 'Contract Number: ${ContractNumber}<br>Contract Name: ${ContractName}<br>Sheet Number: ${SheetNumA}<br>Sheet Description: ${SheetDescription}<br> Document Type: ${dDocumentType}<br>Path: <a href=${WebRelativeImagePath}>${WebRelativeImagePath}</a>'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Sewer Problems',
		  	url: rootPathOptions[activeLocation]+'10',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"Problems",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID', 'Description'],
		  		infoTemplate: {
		  			title: '<b>Sewer Problems</b>',
		  			content: 'OBJECTID: ${OBJECTID} <br> Description: ${Description}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Contractee Parcels',
		  	url: rootPathOptions[activeLocation]+'11',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"ContracteeParcels",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Contractee Parcels</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'House Connection Permits',
		  	url: rootPathOptions[activeLocation]+'12',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"ConnectionPermits",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID', 'TaxParcelID', 'PermitNumber', 'Comments', 'WebRelativeImagePath'],
		  		infoTemplate: {
		  			title: '<b>House Connection Permits</b>',
		  			content: 'Tax Parcel ID: ${TaxParcelID}<br>Permit Number: ${PermitNumber}<br>Comments: ${Comments}<br>Path: <a href=${WebRelativeImagePath}>${WebRelativeImagePath}</a><br>'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Sewer Aerial Photo Centers',
		  	url: rootPathOptions[activeLocation]+'15',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"PhotoCenters",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['OBJECTID'],
		  		infoTemplate: {
		  			title: '<b>Sewer Aerial Photo Centers</b>',
		  			content: 'OBJECTID: ${OBJECTID}'
		  		}
		  	},
	  		style: {
	  			type: "point",
	  			tblField: []
	  		},
	  		labels: []
	  	},
	  	{
		 	name: 'Possible Easement Parcels',
		  	url: rootPathOptions[activeLocation]+'17',
		  	visible: false,
		  	renderOptions: [],
		  	currentRender: "",
		  	options: {
		  		id:"EasementParcels",
		  		visible: false,
		  		displayOnPan: false,
		  		outFields: ['PARCELID', 'LAST_NAME', 'STREET', 'CITY', "MAIL_ZIP", "OWNER_NAME"],
		  		infoTemplate: {
		  			title: '<b>Possible Easement Parcels</b>',
		  			content: 'Tax Map: ${PARCELID} <br> Last Name: ${LAST_NAME} <br> Street: ${STREET}<br> City: ${CITY}<br> Mail Zip: ${MAIL_ZIP}<br> Owner Name: ${OWNER_NAME}'
		  		}
		  	},
	  		style: {
	  			type: "polygon",
	  			tblField: []
	  		},
	  		labels: []
	  	},	
	 ]
    }
})