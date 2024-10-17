import moment from 'moment';

const timestampFormat = (timestamp, format) => {
    return moment(timestamp).format(format);
}

export default timestampFormat;