using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.feedback;
using eagletechapi.entity.feedback;

namespace eagletechapi.service.interfaces
{
    public interface IFeedbackService
    {
        Task<Feedback> CriarFeedback(FeedbackIn feedbackIn);
        Task<Feedback?> BuscarFeedback(int feedbackId);
        Task<IEnumerable<Feedback>> BuscarFeedbacksPorPeriodo(DateTime inicio, DateTime fim);
    }
}