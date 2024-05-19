import { VStack, AvatarGroup, Flex, Avatar, Text, Button } from "@chakra-ui/react";
import React from "react";

const ProfileHeader = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar
          src="/profilepic.png"
          name="Francis"
          alt="Francis profile pic"
        />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "md", md: "lg" }}>Francis</Text>
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button bg={"white"} color={"black"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs", md:"sm"}}>Edit Profile</Button>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={{base:2, sm:4}}>
          <Text fontSize={{base:"xs", md:"sm"}}>
            <Text as={"span"} fontweight={"bold"} mr={1}>4</Text>
            Posts
          </Text>
          <Text fontSize={{base:"xs", md:"sm"}}>
            <Text as={"span"} fontweight={"bold"} mr={1}>149</Text>
            Followers
          </Text>
          <Text fontSize={{base:"xs", md:"sm"}}>
            <Text as={"span"} fontweight={"bold"} mr={1}>175</Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>Francis Nguyen</Text>
        </Flex>
        <Text fontSize={"sm"}>Software Developer</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
