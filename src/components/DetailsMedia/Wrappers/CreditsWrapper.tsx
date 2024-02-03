"use client";

import { FC } from "react";
import { Tabs, Tab, Card, CardBody, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import {
  CastMovies,
  CastTvShows,
  CrewMovies,
  CrewTvShows,
} from "@/models/people";

type Props = {
  itemCastMovie?: CastMovies[];
  itemCrewMovie?: CrewMovies[];
  itemCastTvShow?: CastTvShows[];
  itemCrewTvShow?: CrewTvShows[];
};
const CreditsWrapper: FC<Props> = (props) => {
  const { itemCastMovie, itemCrewMovie, itemCastTvShow, itemCrewTvShow } =
    props;
  const router = useRouter();

  return (
    <section className="pt-10">
      <Tabs aria-label="Onglets" className="mx-4 md:mx-0" variant="bordered">
        <Tab
          key="Distribution"
          title={
            <div className="my-2 flex items-center space-x-4">
              <span className="text-sm">Distribution</span>
              <Chip className="bg-white text-sm text-primary">
                {itemCastMovie?.length || itemCastTvShow?.length || 0}
              </Chip>
            </div>
          }
        >
          {itemCastMovie ? (
            <div className="mx-auto my-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
              {itemCastMovie?.map((person) => (
                <Card
                  key={person.id}
                  isPressable
                  className="bg-primary"
                  onPress={() =>
                    router.push(
                      `/person/${person.id}/${person.name.toLowerCase().replace(/[\W_]+/g, "-")}`,
                    )
                  }
                >
                  <CardBody>
                    <div className="flex flex-col items-center justify-center">
                      <picture>
                        <img
                          src={
                            person?.profile_path
                              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${person.profile_path}`
                              : "/images/defaultImage.png"
                          }
                          alt={person.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: 66,
                            height: 100,
                            borderRadius: 4,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        />
                      </picture>
                      <h4 className="text-center text-sm">{person.name}</h4>
                      <p className="text-center text-xs text-gray-500">
                        {person.character}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto my-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
              {itemCastTvShow?.map((person) => (
                <Card
                  key={person.id}
                  isPressable
                  className="bg-primary"
                  onPress={() =>
                    router.push(
                      `/person/${person.id}/${person.name.toLowerCase().replace(/[\W_]+/g, "-")}`,
                    )
                  }
                >
                  <CardBody>
                    <div className="flex flex-col items-center justify-center">
                      <picture>
                        <img
                          src={
                            person?.profile_path
                              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${person.profile_path}`
                              : "/images/defaultImage.png"
                          }
                          alt={person.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: 66,
                            height: 100,
                            borderRadius: 4,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        />
                      </picture>
                      <h4 className="text-center text-sm">{person.name}</h4>
                      <p className="text-center text-xs text-gray-500">
                        {person.roles[0].character}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </Tab>
        <Tab
          key="Equipe technique"
          title={
            <div className="my-2 flex items-center space-x-4">
              <span className="text-sm">Equipe technique</span>
              <Chip className="bg-white text-sm text-primary">
                {itemCrewMovie?.length || itemCrewTvShow?.length || 0}
              </Chip>
            </div>
          }
        >
          {itemCrewMovie ? (
            <div className="mx-auto my-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
              {itemCrewMovie?.map((person) => (
                <Card
                  key={person.id}
                  className="bg-primary"
                  isPressable
                  onPress={() =>
                    router.push(
                      `/person/${person.id}/${person.name.toLowerCase().replace(/[\W_]+/g, "-")}`,
                    )
                  }
                >
                  <CardBody>
                    <div className="flex flex-col items-center justify-center">
                      <picture>
                        <img
                          src={
                            person.profile_path
                              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${person.profile_path}`
                              : "/images/defaultImage.png"
                          }
                          alt={person.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: 66,
                            height: 100,
                            borderRadius: 4,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        />
                      </picture>
                      <h4 className="text-center text-sm">{person.name}</h4>
                      <p className="text-center text-xs text-gray-500">
                        {person.job}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto my-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-4">
              {itemCrewTvShow?.map((person) => (
                <Card
                  key={person.id}
                  isPressable
                  className="bg-primary"
                  onPress={() =>
                    router.push(
                      `/person/${person.id}/${person.name.toLowerCase().replace(/[\W_]+/g, "-")}`,
                    )
                  }
                >
                  <CardBody>
                    <div className="flex flex-col items-center justify-center">
                      <picture>
                        <img
                          src={
                            person.profile_path
                              ? `${process.env.NEXT_PUBLIC_TMDB_API_IMAGE_URL}/w185${person.profile_path}`
                              : "/images/defaultImage.png"
                          }
                          alt={person.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: 66,
                            height: 100,
                            borderRadius: 4,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        />
                      </picture>
                      <h4 className="text-center text-sm">{person.name}</h4>
                      <p className="text-center text-xs text-gray-500">
                        {person.jobs[0].job}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </Tab>
      </Tabs>
    </section>
  );
};

export default CreditsWrapper;
