import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../models/book";
import { CreateBookInput } from "../inputs/create_book_input";
import { UpdateBookInput } from "../inputs/update_book_input";

@Resolver()
export class BookResolver {
    @Query(() => [Book])
    books() {
        return Book.find();
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const book = Book.create(data);
        await book.save();
        return book;
    }

    @Mutation(() => Book)
    async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error("Book not found!");
        Object.assign(book, data);
        await book.save();
        return book;
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg("id") id: string) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error("Book not found!");
        await book.remove();
        return true;
    }

    @Query(() => Book)
    book(@Arg("id") id: string) {
        return Book.findOne({ where: { id } });
    }
}