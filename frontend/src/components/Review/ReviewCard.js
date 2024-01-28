import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

//리뷰 카드 컴포넌트
const ReviewCard = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card mb={4} style={{ maxWidth: "600px" }}>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">{data.title}</Heading>
                <Text>{data.date + " " + data.place + "에서"}</Text>
              </Box>
            </Flex>
            {/* 이걸 나중에 수정버튼으로 쓰자구 */}
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<AddIcon />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{data.content}</Text>
        </CardBody>
        <Image objectFit="cover" src={data.photo} alt="Chakra UI" />

        {/* 아래 코드는 카드 하단 인데 사실 쓸모는 없지만 혹시 몰라서 남겨둠 */}
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<AddIcon />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewCard;
