import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // alert('iam interceptor')
  const loadingService = inject(LoadingService);
  loadingService.showLoading();
  
  return next(req).pipe(
    finalize(() => loadingService.hideLoading())
  );
};
