import { Box, Image } from "@chakra-ui/react";
import { serverUrl } from "../constants/serverUrl";
import propTypes from 'prop-types'
import Badge from './Badge';

const BadgeAvatar = (props) => {
    return <Box pos={"relative"} w={props.width ? props.width : '40px'} h={props.height ? props.height : '40px'}>
        <Image rounded={8} src={`${serverUrl}/avatar/${props.src}`} />
        <Badge status={props.status} bottom={"0"} />
    </Box>
}

BadgeAvatar.propTypes = {
    width: propTypes.string,
    height: propTypes.string,
    src: propTypes.string.isRequired,
    status: propTypes.number.isRequired,
}

export default BadgeAvatar;