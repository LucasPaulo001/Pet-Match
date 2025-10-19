import ListPets from "@/components/ListPets/ListPets";

export default function DogsPage(){

    return(
        <div>
            <ListPets valueDogs={true} valueCats={false} />
        </div>
    );
};