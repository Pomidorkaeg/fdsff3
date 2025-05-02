using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Players()
    {
        var players = _context.Players.ToList();
        return View(players);
    }

    public IActionResult EditPlayer(int id)
    {
        var player = _context.Players.Find(id);
        if (player == null) return NotFound();
        return View(player);
    }

    [HttpPost]
    public IActionResult EditPlayer(Player player)
    {
        if (ModelState.IsValid)
        {
            _context.Update(player);
            _context.SaveChanges();
            return RedirectToAction("Players");
        }
        return View(player);
    }

    [HttpPost]
    public IActionResult DeletePlayer(int id)
    {
        var player = _context.Players.Find(id);
        if (player != null)
        {
            _context.Players.Remove(player);
            _context.SaveChanges();
        }
        return RedirectToAction("Players");
    }
}
