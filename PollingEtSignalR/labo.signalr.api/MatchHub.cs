using labo.signalr.api.Data;
using labo.signalr.api.Models;
using Microsoft.AspNetCore.SignalR;

public class MatchHub:Hub
{
    private readonly ApplicationDbContext _context;

    public MatchHub(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task EnvoyerAUnUsager(int value, string userId)
    {
        await Clients.User(userId).SendAsync("tasklist", value);
    }

    public async Task AddTask(int value, string taskText)
    {
        UselessTask uselessTask = new UselessTask()
        {
            Completed = false,
            Text = taskText
        };
        _context.UselessTasks.Add(uselessTask);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("tasklist", value);
    }

    public async Task CompleteTask(int value, int id)
    {
        UselessTask? task = await _context.FindAsync<UselessTask>(id);
        if (task != null)
        {
            task.Completed = true;
            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("tasklist", value);
        }

        
    }
}