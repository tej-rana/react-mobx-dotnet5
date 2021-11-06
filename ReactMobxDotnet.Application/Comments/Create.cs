using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ReactMobxDotnet.Application.Core;
using ReactMobxDotnet.Application.Interfaces;
using ReactMobxDotnet.Domain;
using ReactMobxDotnet.Persistence;

namespace ReactMobxDotnet.Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _dbContext;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext dbContext, IUserAccessor userAccessor, IMapper mapper)
            {
                _dbContext = dbContext;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }
            
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dbContext.Activities.FindAsync(request.ActivityId);
                if (activity == null) return null;

                var user = await _dbContext.Users.Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };
                
                activity.Comments.Add(comment);

                var success = await _dbContext.SaveChangesAsync() > 0;
                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                
                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}