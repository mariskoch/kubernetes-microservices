import { IsNotEmpty, IsString, Matches } from 'class-validator';

export default class CreateCounterDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9-]{4,16}$/, {
        message:
            'name must be alphanumeric and can contain dashes and must be between 4 and 16 characters long',
    })
    name: string;
}
