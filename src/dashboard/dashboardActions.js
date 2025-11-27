import axios from 'axios'
import consts from '../consts'

export function getSummary(startDate, endDate) {
    const url = `${consts.API_URL}/billingCycles/summary`;
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const request = axios.get(url, { params });
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}