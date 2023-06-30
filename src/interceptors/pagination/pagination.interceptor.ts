import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPagination } from "../../shared/type";

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler<{
      data: any[];
      pagination: IPagination;
    }>
  ): Observable<any[]> {
    return next.handle().pipe(
      map(({ data, pagination }) => {
        const response = ctx.switchToHttp().getResponse();
        response.header("x-pagination-total", pagination.total);
        response.header("x-pagination-page", pagination.page);
        response.header("x-pagination-page-size", pagination.limit);

        return data;
      })
    );
  }
}
