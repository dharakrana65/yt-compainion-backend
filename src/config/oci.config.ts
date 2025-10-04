import dotenv from 'dotenv';
import path from  'path'
dotenv.config({path: path.resolve(process.cwd(), `.env`)});

const OCI_CONFIG_LOCATION = process.env.OCI_CONFIG_LOCATION || 'local';
const OCI_CONFIG_PROFILE = process.env.OCI_CONFIG_PROFILE || 'default'; 
const OCI_COMPARTMENT_ID = process.env.OCI_COMPARTMENT_ID || '';
const ENDPOINT = process.env.ENDPOINT || '';

export default {
    OCI_CONFIG_LOCATION,
    OCI_CONFIG_PROFILE,
    OCI_COMPARTMENT_ID,
    ENDPOINT
}